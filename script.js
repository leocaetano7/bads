const form = document.getElementById('meuForm');
const lista = document.getElementById('listaDados');


document.addEventListener('DOMContentLoaded', exibirDados);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const registro = {
        id: Date.now(),
        mao: document.getElementById('mao').value,
        adversaria: document.getElementById('adversaria').value,
        bad: document.getElementById('bad').value
    };

    fetch(URL_PLANILHA, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registro)
    })
    .then(() => console.log("Enviado para planilha!"))
    .catch(err => console.error("Erro planilha:", err));

    const bancoLocal = JSON.parse(localStorage.getItem('meuBancoDB')) || [];
    bancoLocal.push(registro);
    localStorage.setItem('meuBancoDB', JSON.stringify(bancoLocal));

    form.reset();
    exibirDados();
    alert("Mão registrada!");
});

function exibirDados() {
    const banco = JSON.parse(localStorage.getItem('meuBancoDB')) || [];
    lista.innerHTML = '<h3 style="font-size: 1rem; color: #666; margin-top:20px;">Histórico Local:</h3>';

    if (banco.length === 0) {
        lista.innerHTML += '<p style="color:gray; font-size: 0.8rem;">Nenhum registro.</p>';
        return;
    }

    banco.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="info-dados">
                <strong>Mão:</strong> ${item.mao}<br>
                <strong>Adversária:</strong> ${item.adversaria}<br>
                <strong>Bad:</strong> ${item.bad}
            </div>
            <button class="btn-delete" onclick="apagarItem(${item.id})">Apagar</button>
        `;
        lista.appendChild(card);
    });
}

function apagarItem(idParaRemover) {
    let banco = JSON.parse(localStorage.getItem('meuBancoDB')) || [];
    banco = banco.filter(item => item.id !== idParaRemover);
    localStorage.setItem('meuBancoDB', JSON.stringify(banco));
    exibirDados();
}
