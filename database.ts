import { Database } from "bun:sqlite"

let db: Database | null = null


export function run() {
    if (!db) {
        db = new Database("database.sqlite")
    }

    return db
}