const fs = require('fs');
const path = require('path');

// Lê e parseia o JSON
function carregarNiveis(caminho) {
  const dados = fs.readFileSync(path.resolve(__dirname, caminho), 'utf-8');
  return JSON.parse(dados);
}

// Verifica se os níveis cumprem a regra definida
function verificaSeCumpreRegra(niveis) {
  let topoAnterior = -Infinity;

  for (let i = 0; i < niveis.length; i++) {
    const nivel = niveis[i];

    if (nivel.length === 0) continue;

    const baseMin = Math.min(...nivel.map(e => e.base));
    const topoMax = Math.max(...nivel.map(e => e.topo));

    for (const obj of nivel) {
      if (!(obj.base > topoAnterior && obj.base <= topoMax)) {
        console.log(`Erro no nível ${i}: objeto { base: ${obj.base}, topo: ${obj.topo} } viola a regra.`);
        return false;
      }
    }

    topoAnterior = topoMax;
  }

  return true;
}

// Execução principal
function main() {
  const caminhoArquivo = 'niveis.json';

  try {
    const niveis = carregarNiveis(caminhoArquivo);
    const estaCorreto = verificaSeCumpreRegra(niveis);

    console.log(`\nConteúdo lido de ${caminhoArquivo}:`);
    console.dir(niveis, { depth: null });

    console.log(`\nCumpre a regra? ${estaCorreto ? 'SIM' : 'NÃO'}`);
  } catch (err) {
    console.error('Erro ao processar o arquivo:', err.message);
  }
}

main();
