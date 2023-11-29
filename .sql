-- Active: 1698895343792@@localhost@3320@trabalhoPW
USE trabalhoPW;
-- tabela user
CREATE TABLE user(
    id INT NOT NULL KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    email VARCHAR(200),
    telefone VARCHAR(200),
    senha VARCHAR(200),
    tipo VARCHAR(50),
    foto VARCHAR(200)
);
-- tabela restaurante
CREATE TABLE restaurante(
    id INT NOT NULL KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    endereco VARCHAR(200),
    foto VARCHAR(200),
    nota DOUBLE,
    userID INT,
    FOREIGN KEY (userID) REFERENCES user(id)
);
-- tabela critica
CREATE TABLE critica(
    id INT NOT NULL KEY AUTO_INCREMENT,
    texto VARCHAR(1000),
    nota DOUBLE,
    data VARCHAR(10),
    userID INT,
    Foreign Key (userID) REFERENCES user(id),
    restauranteID INT,
    Foreign Key (restauranteID) REFERENCES restaurante(id)
);
-- tabela categoria
CREATE TABLE categoria(
    id INT NOT NULL KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    restauranteID INT,
    Foreign Key (restauranteID) REFERENCES restaurante(id)
);
-- tabela comida
CREATE TABLE comida(
    id INT NOT NULL KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    imagem VARCHAR(200),
    descricao VARCHAR(1000),
    valor DOUBLE,
    categoriaID INT,
    Foreign Key (categoriaID) REFERENCES categoria(id)
);

-- drop das tabelas
DROP TABLE user;
DROP TABLE restaurante;
DROP TABLE critica;
DROP TABLE categoria;
DROP TABLE comida;
-- delete das tabelas
DELETE FROM user;
DELETE FROM restaurante;
DELETE FROM critica;
DELETE FROM categoria;
-- select das tabelas
SELECT *
FROM user;
SELECT *
FROM restaurante;
SELECT *
FROM critica;
SELECT *
FROM categoria;

SELECT * FROM comida;
-- outros
SELECT restaurante.nome AS resNome,
    restaurante.endereco AS resEndereco,
    restaurante.nota AS resNota,
    user.nome AS userNome,
    user.email AS userEmail
FROM restaurante
    INNER JOIN user ON user.id = restaurante.userID
WHERE restaurante.id = 1;
SELECT user.nome AS userNome,
    user.foto AS userFoto,
    critica.nota AS criticaNota,
    critica.data AS criticaData,
    critica.texto AS criticaTexto
FROM critica
    INNER JOIN user ON user.id = critica.userID
WHERE critica.restauranteID = 1;
SELECT *
FROM critica
WHERE critica.userID = 1;
SELECT user.nome AS userNome,
    user.foto AS userFoto,
    critica.nota AS criticaNota,
    critica.data AS criticaData,
    critica.texto AS criticaTexto,
    restaurante.id AS restauranteID,
    restaurante.nome AS restauranteNome
FROM critica
    INNER JOIN user ON user.id = critica.userID
    INNER JOIN restaurante ON restaurante.id = critica.restauranteID
WHERE critica.userID = 2;
SELECT user.nome AS userNome,
    user.foto AS userFoto,
    critica.nota AS criticaNota,
    critica.data AS criticaData,
    critica.texto AS criticaTexto,
    restaurante.id AS restauranteID,
    restaurante.nome AS restauranteNome
FROM critica
    INNER JOIN user ON user.id = critica.userID
    INNER JOIN restaurante ON restaurante.id = critica.restauranteID
WHERE critica.userID = 2;

DELETE FROM categoria WHERE id = ?;


SELECT comida.nome AS comidaNome
,comida.imagem AS comidaImagem
,comida.valor AS comidaValor
,comida.descricao AS comidaDescricao
FROM comida INNER JOIN categoria
ON comida.categoriaID = categoria.id
WHERE comida.categoriaID = ?;