import { run } from './database.ts'
import { Item } from './classes.ts'


// GET
function showTable() {
    const db = run();

    return db.query(`SELECT * FROM estoque`).all();
}


// POST
function  insertItem(params: any) {
    const db = run();

    params.preco = parseInt(params.preco) * 100;
    params.quantidade = parseInt(params.quantidade);

    const item = new Item(params.nome,
                          params.quantidade,
                          params.preco);

    const item_insertion = db.run(`INSERT INTO estoque
                               (nome, quantidade, preco)
                               VALUES (?, ?, ?)`,
                               [item.nome,
                                item.quantidade,
                                item.preco]);
    return item_insertion;
}


// PUT
function updateItem(params: any) {
    const db = run();

    params.preco = parseInt(params.preco) * 100;
    params.quantidade = parseInt(params.quantidade);

    const item = new Item(params.nome,
                          params.quantidade,
                          params.preco);

    const item_update = db.run(`UPDATE estoque
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
function deleteItem(params: any) {
    const db = run();

    const item_deletion = db.run(`DELETE FROM estoque
                               WHERE id = ?`,
                               [params.id]);
    return item_deletion;
}

export { showTable, insertItem, updateItem, deleteItem }