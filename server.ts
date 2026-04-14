import express from 'express'
import type { Request, Response } from 'express'

import { showTable, insertItem, updateItem, deleteItem } from './services'

import { run } from './database.ts'


const app = express()
app.use(express.json())
const port = 3000


function initDB() {
    const db = run();

    const table = db.exec(`CREATE TABLE IF NOT EXISTS estoque (
                    id INTEGER PRIMARY KEY,
                    nome TEXT NOT NULL,
                    quantidade INTEGER NOT NULL,
                    preco INTEGER NOT NULL
                )`
            );
}

initDB()


app.get('/', (req: Request, res: Response) => {
  res.send('Olá estoquista!')
})


// GET
app.get('/estoque', async (req: Request, res: Response) => {
    try {
      const table = showTable();
      res.status(200).json(table);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao mostrar o estoque' });
    }
  });


// POST
app.post('/estoque', async (req: Request, res: Response) => {
    try {
     await insertItem(req.body)
      res.status(201).json({ message: 'Sucesso ao inserir item' })
    } catch (error) {
      res.status(500).json({ error: 'Falha ao inserir item' })
    }
});


// PUT
app.put('/estoque/:id', async (req: Request, res: Response) => {
    try {
      await updateItem(req.body)
      res.status(200).json({ message: 'Sucesso ao atualizar item'})
    } catch (error) {
      res.status(500).json({ error: 'Falha ao atualizar item' })
    }
});


// DELETE
app.delete('/estoque/:id', async (req: Request, res: Response) => {
    try {
      await deleteItem(req.body)
      res.status(200).json({ message: 'Sucesso ao deletar item' })
    } catch (error) {
      res.status(500).json({ error: 'Falha ao deletar item' })
    }
})


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})