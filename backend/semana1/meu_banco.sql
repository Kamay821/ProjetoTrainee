-- CRIAR BANCO DE DADOS
CREATE DATABASE sistema;
USE sistema;

-- TABELA USUARIO
CREATE TABLE usuario(
	id_usuario INT auto_increment PRIMARY key,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20)
);

-- TABELA LIVRO
CREATE TABLE livro(
	id_livro INT auto_increment PRIMARY key,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100),
    ano_publicacao INT,
    disponibilidade BOOLEAN DEFAULT TRUE
);

-- TABELA EMPRESTIMO
CREATE TABLE emprestimo(
	id_emprestimo INT auto_increment PRIMARY key,
    id_usuario INT NOT NULL,
    id_livro INT NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolução DATE,
    status ENUM('em-aberto','devolvido') DEFAULT 'em_aberto',
    FOREIGN key (id_usuario) REFERENCES usuario(id_usuario) ON DELETE cascade,
    FOREIGN key (id_livro) REFERENCES livro(id_livro) ON DELETE cascade
);