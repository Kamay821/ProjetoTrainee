let count = 0
const contagem = document.getElementById('count');
const btnPlus = document.getElementById('plus');
const btnMinus = document.getElementById('minus');

function Atualizar() {
    contagem.textContent = count;
    btnMinus.disabled = (count <= 0);
}

function Aumentar() {
    count += 1;
    Atualizar();
}

function Diminuir() {
    if (count > 0){
        count -= 1;
        Atualizar();
    }
}

btnPlus.addEventListener('click', Aumentar);
btnMinus.addEventListener('click', Diminuir);

Atualizar();