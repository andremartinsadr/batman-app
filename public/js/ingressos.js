document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-compra');
    const btnComprar = document.getElementById('btn-comprar');
    const btnFechar = document.querySelector('.close-modal');
    const formCompra = document.getElementById('form-compra');
    const selectTipo = document.getElementById('tipo-ingresso');
    const inputQtd = document.getElementById('qtd-ingresso');
    const valorTotalSpan = document.getElementById('valor-total');
    const msgSucesso = document.getElementById('mensagem-sucesso');
    const detalhesTicket = document.getElementById('detalhes-ticket');
    const btnFecharSucesso = document.getElementById('btn-fechar-sucesso');

    if (
        !modal ||
        !btnComprar ||
        !btnFechar ||
        !formCompra ||
        !selectTipo ||
        !inputQtd ||
        !valorTotalSpan ||
        !msgSucesso ||
        !detalhesTicket
    ) {
        return;
    }

    function calcularTotal() {
        const precoUnitario = Number.parseFloat(selectTipo.value) || 0;
        const quantidade = Number.parseInt(inputQtd.value, 10) || 1;
        const total = precoUnitario * quantidade;

        valorTotalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    function fecharModal() {
        modal.style.display = 'none';
        btnComprar.focus();
    }

    btnComprar.addEventListener('click', (event) => {
        event.preventDefault();
        modal.style.display = 'flex';
        formCompra.style.display = 'block';
        msgSucesso.style.display = 'none';
        calcularTotal();
        selectTipo.focus();
    });

    btnFechar.addEventListener('click', fecharModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            fecharModal();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            fecharModal();
        }
    });

    selectTipo.addEventListener('change', calcularTotal);
    inputQtd.addEventListener('input', calcularTotal);

    formCompra.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!formCompra.reportValidity()) {
            return;
        }

        const sessao = document.getElementById('data-sessao').value;
        const quantidade = Number.parseInt(inputQtd.value, 10);
        const total = valorTotalSpan.textContent;

        detalhesTicket.replaceChildren();

        const addDetail = (label, value) => {
            const line = document.createElement('span');
            const strong = document.createElement('strong');
            strong.textContent = value;
            line.append(`${label}: `, strong);
            detalhesTicket.append(line, document.createElement('br'));
        };

        addDetail('Sessão', sessao);
        addDetail('Quantidade', `${quantidade} ingresso(s)`);
        addDetail('Valor Pago', total);

        const note = document.createElement('em');
        note.textContent = 'Apresente o seu QR Code fictício na entrada do cinema.';
        detalhesTicket.append(document.createElement('br'), note);

        formCompra.style.display = 'none';
        msgSucesso.style.display = 'block';
        btnFecharSucesso?.focus();
    });

    btnFecharSucesso?.addEventListener('click', fecharModal);
});
