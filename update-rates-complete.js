async function updateMarketRates() {
    console.log('🚀 Iniciando busca do IBOVESPA...');
    
    try {
        const proxy = 'https://api.allorigins.win/raw?url=';
        const yahooUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/^BVSP';
        
        const response = await fetch(proxy + encodeURIComponent(yahooUrl));
        const data = await response.json();
        
        if (data.chart && data.chart.result && data.chart.result[0]) {
            const ibov = Math.round(data.chart.result[0].meta.regularMarketPrice);
            
            // Mostrar resultado
            alert(`✅ IBOVESPA REAL: ${ibov.toLocaleString('pt-BR')} pontos`);
            
            // Tentar várias formas de encontrar o elemento IBOVESPA
            let ibovElement = null;
            
            // Método 1: Procurar por texto "142.500"
            const allElements = document.querySelectorAll('*');
            for (let el of allElements) {
                if (el.textContent && el.textContent.trim() === '142.500') {
                    ibovElement = el;
                    break;
                }
            }
            
            // Método 2: Procurar próximo ao texto "IBOVESPA"
            if (!ibovElement) {
                for (let el of allElements) {
                    if (el.textContent && el.textContent.includes('IBOVESPA')) {
                        const parent = el.parentElement;
                        if (parent) {
                            const valueEl = parent.querySelector('*');
                            if (valueEl && valueEl.textContent.includes('142.500')) {
                                ibovElement = valueEl;
                                break;
                            }
                        }
                    }
                }
            }
            
            // Método 3: IDs e classes comuns
            if (!ibovElement) {
                const selectors = [
                    '#ibovespa-value',
                    '#ibov-value', 
                    '.ibovespa-value',
                    '.ibov-value',
                    '[data-ibov]'
                ];
                
                for (let selector of selectors) {
                    ibovElement = document.querySelector(selector);
                    if (ibovElement) break;
                }
            }
            
            // Atualizar o elemento se encontrado
            if (ibovElement) {
                ibovElement.textContent = ibov.toLocaleString('pt-BR');
                console.log('✅ Card atualizado visualmente para:', ibov);
                alert(`🎉 IBOVESPA atualizado no card: ${ibov.toLocaleString('pt-BR')}`);
            } else {
                console.log('⚠️ Elemento IBOVESPA não encontrado para atualizar');
            }
            
        } else {
            throw new Error('Dados não encontrados');
        }
        
    } catch (error) {
        console.error('❌ Erro:', error);
        alert('❌ Erro ao buscar IBOVESPA: ' + error.message);
    }
}

window.updateMarketRates = updateMarketRates;
console.log('✅ Script melhorado carregado');
