// Módulo de Manipulação da Interface do Usuário (DOM)

export function exibirMensagem(elemento, texto, tipo) {
    if (!elemento) return;
    
    elemento.textContent = texto;
    elemento.style.display = 'block';

    if (tipo === 'sucesso') {
        elemento.style.backgroundColor = '#d4edda';
        elemento.style.color = '#155724';
    } else if (tipo === 'erro') {
        elemento.style.backgroundColor = '#f8d7da';
        elemento.style.color = '#721c24';
    } else if (tipo === 'info') {
        elemento.style.backgroundColor = '#cce5ff';
        elemento.style.color = '#004085';
    }
}

export function ocultarMensagem(elemento, tempoMs = 3000) {
    if (!elemento) return;
    setTimeout(() => {
        elemento.style.display = 'none';
    }, tempoMs);
}

export function alternarEstadoBotao(botao, carregando, textoPadrao = 'Buscar') {
    if (!botao) return;
    if (carregando) {
        botao.disabled = true;
        botao.textContent = 'Buscando na Web...';
    } else {
        botao.disabled = false;
        botao.textContent = textoPadrao;
    }
}