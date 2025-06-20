const form = document.getElementById('login');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmarsenha').value;

    if (!email || !senha || !confirmar) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    if (senha !== confirmar) {
        alert('As senhas não são iguais!')
        return;
    }

    alert(
        `Cadastro completo:\n\nEmail: ${email}\nSenha: ######`
    );
});

const botaomostrar = document.querySelectorAll('.mostrarsenha');
botaomostrar.forEach(btn => {
    btn.addEventListener('click', () => {
        const ID = btn.getAttribute('data-target');
        const input = document.getElementById(ID);

        if (input.type === 'password') {
            input.type = 'text';
            btn.textContent = 'Ocultar';
        } else {
            input.type = 'password';
            btn.textContent = 'Mostrar';
        }
    });
});