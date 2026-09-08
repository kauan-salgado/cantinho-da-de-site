/**
 * Lê o calendário .ics do anúncio no Airbnb e devolve as datas ocupadas.
 *
 * O navegador não consegue buscar esse arquivo direto (o Airbnb não envia
 * cabeçalhos de CORS), e o endereço é secreto — quem tem o link enxerga as
 * datas ocupadas. Por isso a busca acontece aqui, no servidor, com o
 * endereço vindo da variável de ambiente AIRBNB_ICAL_URL.
 *
 * Falha com elegância: qualquer erro devolve lista vazia, e o calendário do
 * site volta a mostrar só os bloqueios manuais em vez de quebrar.
 */

/** 20260913 -> 2026-09-13 */
function paraIso(compacta) {
  return `${compacta.slice(0, 4)}-${compacta.slice(4, 6)}-${compacta.slice(6, 8)}`;
}

/** Enumera os dias de inicio até fim, sem incluir fim (DTEND do iCal é exclusivo). */
function diasDoIntervalo(inicio, fim) {
  const dias = [];
  const atual = new Date(`${inicio}T00:00:00`);
  const limite = new Date(`${fim}T00:00:00`);
  while (atual < limite) {
    dias.push(atual.toISOString().slice(0, 10));
    atual.setDate(atual.getDate() + 1);
  }
  return dias;
}

/**
 * Devolve as noites ocupadas e, separadamente, os dias de saída.
 *
 * O dia da saída fica livre para uma nova hospedagem (o hóspede sai de manhã),
 * mas NÃO serve para um evento que começa às 9h — ainda tem gente na casa e
 * a limpeza precisa acontecer. Por isso os dois conjuntos vão separados: quem
 * decide o que bloquear é a página, conforme o formato escolhido.
 */
export function extrairDatasOcupadas(ics) {
  // Desdobra linhas quebradas pelo padrão iCal (continuação começa com espaço).
  const texto = ics.replace(/\r?\n[ \t]/g, '');
  const ocupadas = new Set();
  const saidas = new Set();

  for (const bloco of texto.split('BEGIN:VEVENT').slice(1)) {
    const inicio = bloco.match(/DTSTART[^:]*:(\d{8})/);
    const fim = bloco.match(/DTEND[^:]*:(\d{8})/);
    if (!inicio) continue;
    const de = paraIso(inicio[1]);
    const ate = fim ? paraIso(fim[1]) : de;
    for (const dia of diasDoIntervalo(de, ate === de ? de : ate)) ocupadas.add(dia);
    if (ate === de) ocupadas.add(de);
    else saidas.add(ate);
  }

  return { datas: [...ocupadas].sort(), saidas: [...saidas].sort() };
}

export default async function handler() {
  const endereco = process.env.AIRBNB_ICAL_URL;

  if (!endereco) {
    return Response.json(
      { datas: [], saidas: [], aviso: 'AIRBNB_ICAL_URL não configurada' },
      { status: 200 },
    );
  }

  try {
    const resposta = await fetch(endereco, { headers: { 'User-Agent': 'CantinhoDaDe/1.0' } });
    if (!resposta.ok) throw new Error(`Airbnb respondeu ${resposta.status}`);
    const { datas, saidas } = extrairDatasOcupadas(await resposta.text());
    return Response.json(
      { datas, saidas, atualizadoEm: new Date().toISOString() },
      { headers: { 'Cache-Control': 'public, max-age=600' } },
    );
  } catch (erro) {
    console.error('Falha ao ler o calendário do Airbnb:', erro);
    return Response.json({ datas: [], saidas: [], aviso: 'indisponivel' }, { status: 200 });
  }
}
