import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Item } from './classes.ts'


async function run() {
    const db = await open({
        filename: './database',
        driver: sqlite3.Database
    });
    return db;
}


async function createTable() {
    const db = await run();

    const table = await db.exec(`CREATE TABLE IF NOT EXISTS estoque (
                    id INTEGER PRIMARY KEY,
                    nome TEXT NOT NULL,
                    quantidade INTEGER NOT NULL,
                    preco INTEGER NOT NULL
                )`
            );
    return table;
}


// GET
async function showTable() {
    const db = await run();

    const table = await db.all(`SELECT * FROM estoque`);
    return table;
}


// POST
async function  insertItem(params: any) {
    const db = await run();

    params.preco = parseInt(params.preco) * 100;
    params.quantidade = parseInt(params.quantidade);

    const item = new Item(params.nome,
                          params.quantidade,
                          params.preco);

    const item_insertion = await db.run(`INSERT INTO estoque
                               (nome, quantidade, preco)
                               VALUES (?, ?, ?)`,
                               [item.nome,
                                item.quantidade,
                                item.preco]);
    return item_insertion;
}


// PUT
async function updateItem(params: any) {
    const db = await run();

    params.preco = parseInt(params.preco) * 100;
    params.quantidade = parseInt(params.quantidade);

    const item = new Item(params.nome,
                          params.quantidade,
                          params.preco);

    const item_update = await db.run(`UPDATE estoque
                               SET nome = ?,
                                   quantidade = ?,
                                   preco = ?
                               WHERE id = ?`,
                               [item.nome,
                                item.quantidade,
                                item.preco,
                                params.id]);
    return item_update;
}


// DELETE
async function deleteItem(params: any) {
    const db = await run();

    const item_deletion = await db.run(`DELETE FROM estoque
                               WHERE id = ?`,
                               [params.id]);
    return item_deletion;
}

export { createTable, showTable, insertItem, updateItem, deleteItem }