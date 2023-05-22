const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")

// INICIANDO COM O BANCO DE DADOS
export default async function openDb() {
    return sqlite.open({
        filename: "./meubanco.db",
        driver: sqlite3.Database
    })
    
}