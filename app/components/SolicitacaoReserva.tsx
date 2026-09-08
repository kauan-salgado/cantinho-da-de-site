'use client';

import { useEffect, useMemo, useState } from 'react';
import { datasIndisponiveis, tiposDeEvento, whatsappLink } from '../site-config';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const DIAS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

/** AAAA-MM-DD a partir de uma data local, sem passar por UTC. */
function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function paraBR(chave: string) {
  const [a, m, d] = chave.split('-');
  return `${d}/${m}/${a}`;
}

function diasEntre(inicio: string, fim: string) {
  const [ai, mi, di] = inicio.split('-').map(Number);
  const [af, mf, df] = fim.split('-').map(Number);
  const ms = new Date(af, mf - 1, df).getTime() - new Date(ai, mi - 1, di).getTime();
  return Math.round(ms / 86400000) + 1;
}

export default function SolicitacaoReserva() {
  const [tipoId, setTipoId] = useState<string>('workshop');
  const [inicio, setInicio] = useState<string | null>(null);
  const [fim, setFim] = useState<string | null>(null);
  const [pessoas, setPessoas] = useState('');
  const [observacao, setObservacao] = useState('');
  const [ocupadasNoAirbnb, setOcupadasNoAirbnb] = useState<string[]>([]);
  const [saidasNoAirbnb, setSaidasNoAirbnb] = useState<string[]>([]);
  const [sincronia, setSincronia] = useState<'carregando' | 'ok' | 'falhou'>('carregando');

  const hoje = useMemo(() => new Date(), []);
  const [mesVisivel, setMesVisivel] = useState(() => new Date(hoje.getFullYear(), hoje.getMonth(), 1));

  const tipo = tiposDeEvento.find((t) => t.id === tipoId) ?? tiposDeEvento[0];

  // Permite chegar da página de workshops ou de produção com o tipo já escolhido.
  useEffect(() => {
    const desejado = new URLSearchParams(window.location.search).get('tipo');
    if (desejado && tiposDeEvento.some((t) => t.id === desejado)) setTipoId(desejado);
  }, []);

  // Datas já ocupadas no Airbnb. A função roda no servidor porque o Airbnb
  // não libera CORS e o endereço do calendário é secreto. Se falhar, o
  // calendário segue funcionando só com os bloqueios manuais.
  useEffect(() => {
    let ativo = true;
    fetch('/.netlify/functions/disponibilidade')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((dados) => {
        if (!ativo) return;
        setOcupadasNoAirbnb(Array.isArray(dados.datas) ? dados.datas : []);
        setSaidasNoAirbnb(Array.isArray(dados.saidas) ? dados.saidas : []);
        setSincronia('ok');
      })
      .catch(() => ativo && setSincronia('falhou'));
    return () => {
      ativo = false;
    };
  }, []);

  // Trocar de tipo pode invalidar as datas escolhidas (regra de dias muda).
  useEffect(() => {
    setInicio(null);
    setFim(null);
  }, [tipoId]);

  const chaveHoje = iso(hoje);

  function bloqueada(chave: string) {
    if (chave < chaveHoje) return 'passado';
    if (datasIndisponiveis.includes(chave) || ocupadasNoAirbnb.includes(chave)) return 'ocupada';
    // Dia de saída de hóspede não serve para evento: ainda tem gente na casa
    // pela manhã e a limpeza precisa acontecer antes. Para uma nova hospedagem
    // esse mesmo dia está livre, porque a entrada é à tarde.
    if (!tipo.pernoite && saidasNoAirbnb.includes(chave)) return 'ocupada';
    return null;
  }

  function selecionar(chave: string) {
    if (!inicio || (inicio && fim) || chave < inicio) {
      setInicio(chave);
      setFim(null);
      return;
    }
    setFim(chave);
  }

  const grade = useMemo(() => {
    const ano = mesVisivel.getFullYear();
    const mes = mesVisivel.getMonth();
    const primeiro = new Date(ano, mes, 1).getDay();
    const total = new Date(ano, mes + 1, 0).getDate();
    const celulas: ({ chave: string; dia: number; motivo: string | null } | null)[] = [];
    for (let i = 0; i < primeiro; i += 1) celulas.push(null);
    for (let d = 1; d <= total; d += 1) {
      const data = new Date(ano, mes, d);
      const chave = iso(data);
      celulas.push({ chave, dia: d, motivo: bloqueada(chave) });
    }
    return celulas;
  }, [mesVisivel, tipoId, chaveHoje, ocupadasNoAirbnb, saidasNoAirbnb]);

  const numeroPessoas = Number(pessoas);
  const excedeCapacidade = numeroPessoas > tipo.maxPessoas;
  const alertaTransporte = !tipo.pernoite && numeroPessoas > 20 && !excedeCapacidade;
  const podeEnviar = Boolean(inicio) && numeroPessoas > 0 && !excedeCapacidade;

  const noPassado = new Date(mesVisivel.getFullYear(), mesVisivel.getMonth(), 1) <= new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  function mensagem() {
    const periodo = fim && fim !== inicio
      ? `${paraBR(inicio!)} a ${paraBR(fim)} (${diasEntre(inicio!, fim)} dias)`
      : `${paraBR(inicio!)} (1 dia)`;
    const linhas = [
      'Olá! Quero solicitar uma reserva no Cantinho da Dê.',
      '',
      `Tipo: ${tipo.label}`,
      `Data: ${periodo}`,
      `Pessoas: ${numeroPessoas}`,
    ];
    if (observacao.trim()) linhas.push(`Observação: ${observacao.trim()}`);
    linhas.push('', 'Enviado pelo site.');
    return linhas.join('\n');
  }

  return (
    <div className="reserva">
      <div className="reserva-form">
        <fieldset className="campo">
          <legend>1. O que você quer fazer aqui?</legend>
          <div className="chips">
            {tiposDeEvento.map((t) => (
              <button
                key={t.id}
                type="button"
                className={t.id === tipoId ? 'chip ativo' : 'chip'}
                aria-pressed={t.id === tipoId}
                onClick={() => setTipoId(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="campo">
          <legend>2. Quando?</legend>
          <div className="cal-topo">
            <button type="button" onClick={() => setMesVisivel(new Date(mesVisivel.getFullYear(), mesVisivel.getMonth() - 1, 1))} disabled={noPassado} aria-label="Mês anterior">←</button>
            <strong>{MESES[mesVisivel.getMonth()]} {mesVisivel.getFullYear()}</strong>
            <button type="button" onClick={() => setMesVisivel(new Date(mesVisivel.getFullYear(), mesVisivel.getMonth() + 1, 1))} aria-label="Próximo mês">→</button>
          </div>
          <div className="cal-semana" aria-hidden="true">
            {DIAS.map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div className="cal-grade" role="grid">
            {grade.map((c, i) => {
              if (!c) return <span key={`v${i}`} />;
              const selecionada = c.chave === inicio || c.chave === fim;
              const noIntervalo = Boolean(inicio && fim && c.chave > inicio && c.chave < fim);
              const classe = ['cal-dia', c.motivo ? 'off' : '', selecionada ? 'sel' : '', noIntervalo ? 'entre' : ''].filter(Boolean).join(' ');
              return (
                <button
                  key={c.chave}
                  type="button"
                  className={classe}
                  disabled={Boolean(c.motivo)}
                  aria-label={`${paraBR(c.chave)}${c.motivo === 'ocupada' ? ' — indisponível' : ''}`}
                  onClick={() => selecionar(c.chave)}
                >
                  {c.dia}
                </button>
              );
            })}
          </div>
          <p className="cal-legenda">
            {tipo.pernoite
              ? 'Escolha a data de entrada e depois a de saída.'
              : 'Escolha o dia, ou um intervalo se o encontro durar mais de um dia.'}
            {sincronia === 'ok' && ocupadasNoAirbnb.length > 0 && (
              <span className="cal-sync"> Os dias riscados já estão ocupados.</span>
            )}
          </p>
          {inicio && (
            <p className="cal-escolha">
              Selecionado: <strong>{fim && fim !== inicio ? `${paraBR(inicio)} a ${paraBR(fim)}` : paraBR(inicio)}</strong>
              <button type="button" onClick={() => { setInicio(null); setFim(null); }}>limpar</button>
            </p>
          )}
        </fieldset>

        <fieldset className="campo">
          <legend>3. Quantas pessoas?</legend>
          <input
            type="number"
            min={1}
            max={tipo.maxPessoas}
            inputMode="numeric"
            value={pessoas}
            onChange={(e) => setPessoas(e.target.value)}
            placeholder={`Até ${tipo.maxPessoas}`}
            aria-describedby="limite-pessoas"
          />
          <p id="limite-pessoas" className="ajuda">
            {tipo.pernoite ? 'A casa acomoda até 6 hóspedes para pernoite.' : 'O salão comporta 30 pessoas sentadas.'}
          </p>
          {excedeCapacidade && (
            <p className="aviso erro">Acima do limite de {tipo.maxPessoas} pessoas para esse formato. Fale com a gente para ver o que dá para fazer.</p>
          )}
          {alertaTransporte && (
            <p className="aviso">São 10 vagas de estacionamento dentro do lote. Para esse tamanho de grupo, vale combinar van ou carona — a gente ajuda a organizar.</p>
          )}
        </fieldset>

        <fieldset className="campo">
          <legend>4. Quer adiantar alguma coisa? <span>(opcional)</span></legend>
          <textarea
            rows={3}
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Horário pretendido, formato da sala, necessidade de café, equipamento…"
          />
        </fieldset>
      </div>

      <aside className="reserva-resumo">
        <p className="eyebrow dark">Resumo</p>
        <h3>{tipo.label}</h3>
        <dl>
          <div><dt>Data</dt><dd>{inicio ? (fim && fim !== inicio ? `${paraBR(inicio)} a ${paraBR(fim)}` : paraBR(inicio)) : '—'}</dd></div>
          <div><dt>Duração</dt><dd>{inicio ? `${fim && fim !== inicio ? diasEntre(inicio, fim) : 1} dia(s)` : '—'}</dd></div>
          <div><dt>Pessoas</dt><dd>{numeroPessoas > 0 ? numeroPessoas : '—'}</dd></div>
        </dl>
        <a
          className={podeEnviar ? 'button button-gold' : 'button button-gold desativado'}
          href={podeEnviar ? whatsappLink(mensagem()) : undefined}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!podeEnviar}
          onClick={(e) => { if (!podeEnviar) e.preventDefault(); }}
        >
          Enviar pelo WhatsApp <span>↗</span>
        </a>
        <p className="ajuda">
          Isto é uma <strong>solicitação</strong>, não uma reserva confirmada. Abrimos a conversa no
          WhatsApp com esse resumo e confirmamos a disponibilidade na hora.
        </p>
      </aside>
    </div>
  );
}
