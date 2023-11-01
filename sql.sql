USE trabalhoPW;

CREATE TABLE restaurante(
    id INT NOT NULL KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    endereco VARCHAR(200),
    nota DOUBLE
);

CREATE TABLE user(
    id INT NOT NULL KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    email VARCHAR(200),
    telefone VARCHAR(200),
    senha VARCHAR(200),
    tipo VARCHAR(50),
    foto VARCHAR(200)
);

CREATE TABLE critica(
    id INT NOT NULL KEY AUTO_INCREMENT
);







