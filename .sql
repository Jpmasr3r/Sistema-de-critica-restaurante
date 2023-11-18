-- Active: 1698895343792@@26.209.49.87@3320@trabalhoPW
USE trabalhoPW;
CREATE TABLE user(
    id INT NOT NULL KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    email VARCHAR(200),
    telefone VARCHAR(200),
    senha VARCHAR(200),
    tipo VARCHAR(50),
    foto VARCHAR(200)
);
CREATE TABLE restaurante(
    id INT NOT NULL KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    endereco VARCHAR(200),
    foto VARCHAR(200),
    nota DOUBLE,
    userID INT,
    FOREIGN KEY (userID) REFERENCES user(id)
);
DROP TABLE user;
DROP TABLE restaurante;
SELECT *
FROM user;
SELECT *
FROM restaurante;

SELECT
    restaurante.nome AS resNome,
    restaurante.endereco AS resEndereco,
    restaurante.foto AS resFoto,
    restaurante.nota AS resNota,
    user.nome AS userNome,
    user.id AS userID,
    user.email AS userEmail
    FROM restaurante
    INNER JOIN user
    ON user.id = restaurante.userID;