const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);

const createTableSql = `
    CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )
`;

// Cria a tabela caso ela não exista
connection.query(createTableSql, (err) => {
    if (err) {
        console.error('Erro ao criar tabela:', err);
        throw err;
    }

    // Inserção dos registros conforme solicitado no desafio
    const nomes = ['Pierry', 'Lucian', 'Samay'];
    const insertSql = `INSERT INTO people (name) VALUES ?`;
    const values = nomes.map(nome => [nome]);

    connection.query(insertSql, [values], (err) => {
        console.log('Registros inseridos com sucesso.');

        // Inicia o servidor Express após inserção dos registros
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    });
});

app.get('/', (req, res) => {
    const selectSql = 'SELECT name FROM people';

    connection.query(selectSql, (err, results) => {
        const nomes = results.map(result => result.name);
        res.send(`<h1> Full Cycle Rocks! </h1> </br><h1>Nomes no Banco de Dados:</h1><ul>${nomes.map(nome => `<li>${nome}</li>`).join('')}</ul>`);
    });
});
