import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async funtion return() {
    const db = await open({
        filename: './database'
        driver: sqlite3.Database
    })
}