-- sistema de empréstimo de livros
CREATE DATABASE sistema;
USE sistema;

-- usuários do sistema (que pegam livros emprestado)
CREATE TABLE usuario(
	id_usuario INT auto_increment PRIMARY key,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20)
);

-- os livros que podem ser emprestados
CREATE TABLE livro(
	id_livro INT auto_increment PRIMARY key,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100),
    publicacao INT,
    disponibilidade BOOLEAN DEFAULT TRUE
);

-- os emprestimos feitos por clientes
CREATE TABLE emprestimo(
	id_emprestimo INT auto_increment PRIMARY key,
    id_usuario INT NOT NULL,
    id_livro INT NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolução DATE,
    status ENUM('emprestado','devolvido') DEFAULT 'emprestado',
    FOREIGN key (id_usuario) REFERENCES usuario(id_usuario) ON DELETE cascade,
    FOREIGN key (id_livro) REFERENCES livro(id_livro) ON DELETE cascade
-- o on delete cascade faz com que se o livro ou usuário for excluído, o emprestimo some junto
);