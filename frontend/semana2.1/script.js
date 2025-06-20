let count = 0
const contagem = document.getElementById('count');
const btnPlus = document.getElementById('plus');
const btnMinus = document.getElementById('minus');
const btnReset = document.getElementById('reset');

function atualizar() {
    contagem.textContent = count;
    btnMinus.disabled = (count <= 0);
}

function aumentar() {
    count += 1;
    atualizar();
}

function diminuir() {
    if (count > 0){
        count -= 1;
        atualizar();
    }
}

function resetar() {
    count = 0;
    atualizar();
}

btnPlus.addEventListener('click', aumentar);
btnMinus.addEventListener('click', diminuir);
btnReset.addEventListener('click', resetar);

atualizar();