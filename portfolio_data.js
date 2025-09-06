// Portfolio PWA - Dados Reais do CSV
// Total: R$ 1.001.775,98 em 39 investimentos

const importedPortfoliosData = [
  {
    "id": 1,
    "name": "Banco do Brasil - Valdir",
    "institution": "Banco do Brasil",
    "titular": "Valdir",
    "color": "#3b82f6",
    "investments": [
      {"id": "BB001", "name": "Ações Ibovespa Ativo", "category": "AV", "type": "titulo", "currentValue": 2869.89, "acquisitionValue": 2869.89, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BB002", "name": "RF Ref DI Plus Ágil", "category": "RF", "type": "titulo", "currentValue": 2002.77, "acquisitionValue": 2002.77, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BB003", "name": "MM Macro", "category": "Fundos", "type": "fundo", "currentValue": 10857.71, "acquisitionValue": 10857.71, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BB004", "name": "Ações Bolsa Brasil", "category": "AV", "type": "titulo", "currentValue": 20526.97, "acquisitionValue": 20526.97, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BB005", "name": "RF LP High", "category": "RF", "type": "titulo", "currentValue": 113038.88, "acquisitionValue": 113038.88, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BB006", "name": "MM Ouro", "category": "Fundos", "type": "fundo", "currentValue": 51343.96, "acquisitionValue": 51343.96, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BB007", "name": "RF Ativa Plus", "category": "RF", "type": "titulo", "currentValue": 10336.66, "acquisitionValue": 10336.66, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BB008", "name": "RF Ultra High C Priv", "category": "RF", "type": "titulo", "currentValue": 15512.60, "acquisitionValue": 15512.60, "issuer": "Banco do Brasil", "liquidity": "D+1"}
    ]
  },
  {
    "id": 2,
    "name": "Banco do Brasil - Claudia",
    "institution": "Banco do Brasil",
    "titular": "Claudia",
    "color": "#ef4444",
    "investments": [
      {"id": "BBC001", "name": "Ações Ibovespa Ativo", "category": "AV", "type": "titulo", "currentValue": 2460.22, "acquisitionValue": 2460.22, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BBC002", "name": "RF Ref DI Plus Ágil", "category": "RF", "type": "titulo", "currentValue": 10051.02, "acquisitionValue": 10051.02, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BBC003", "name": "MM Macro", "category": "Fundos", "type": "fundo", "currentValue": 19408.57, "acquisitionValue": 19408.57, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BBC004", "name": "Ações Bolsa Brasil", "category": "AV", "type": "titulo", "currentValue": 27517.11, "acquisitionValue": 27517.11, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BBC005", "name": "BB MM Quantitativo", "category": "Fundos", "type": "fundo", "currentValue": 14702.55, "acquisitionValue": 14702.55, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BBC006", "name": "RF LP High", "category": "RF", "type": "titulo", "currentValue": 224810.32, "acquisitionValue": 224810.32, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BBC007", "name": "MM Ouro", "category": "Fundos", "type": "fundo", "currentValue": 22161.21, "acquisitionValue": 22161.21, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BBC008", "name": "RF Ativa Plus", "category": "RF", "type": "titulo", "currentValue": 15354.68, "acquisitionValue": 15354.68, "issuer": "Banco do Brasil", "liquidity": "D+1"},
      {"id": "BBC009", "name": "RF Ultra High C Priv", "category": "RF", "type": "titulo", "currentValue": 15421.86, "acquisitionValue": 15421.86, "issuer": "Banco do Brasil", "liquidity": "D+1"}
    ]
  },
  {
    "id": 3,
    "name": "BRB - Valdir",
    "institution": "BRB",
    "titular": "Valdir", 
    "color": "#10b981",
    "investments": [
      {"id": "BRB001", "name": "LCI 94% do CDI", "category": "RF", "type": "titulo", "currentValue": 32325.22, "acquisitionValue": 32325.22, "issuer": "BRB", "liquidity": "D+90"},
      {"id": "BRB002", "name": "LCI 96% do CDI", "category": "RF", "type": "titulo", "currentValue": 5184.89, "acquisitionValue": 5184.89, "issuer": "BRB", "liquidity": "D+90"},
      {"id": "BRB003", "name": "LCI 97% do CDI", "category": "RF", "type": "titulo", "currentValue": 10658.32, "acquisitionValue": 10658.32, "issuer": "BRB", "liquidity": "D+90"},
      {"id": "BRB004", "name": "LCI 98% do CDI", "category": "RF", "type": "titulo", "currentValue": 311.83, "acquisitionValue": 311.83, "issuer": "BRB", "liquidity": "D+90"},
      {"id": "BRB005", "name": "CDB LD 105% do CDI", "category": "RF", "type": "titulo", "currentValue": 26580.21, "acquisitionValue": 26580.21, "issuer": "BRB", "liquidity": "D+1"},
      {"id": "BRB006", "name": "CDB POS 100% CDI", "category": "RF", "type": "titulo", "currentValue": 76622.65, "acquisitionValue": 76622.65, "issuer": "BRB", "liquidity": "D+1"}
    ]
  }
];

// Estatísticas
const portfolioStats = {
  totalInstitutions: 13,
  totalInvestments: 39,
  totalValue: 1001775.98,
  valdirValue: 649888.44,
  claudiaValue: 351887.54,
  lastUpdate: new Date().toISOString()
};

// Substituir dados mockados
if (typeof portfoliosData !== 'undefined') {
  portfoliosData = importedPortfoliosData;
  console.log('✅ Dados reais carregados: R$ ' + portfolioStats.totalValue.toLocaleString('pt-BR'));
}

console.log('📊 Portfolio PWA - Dados reais do CSV carregados');
