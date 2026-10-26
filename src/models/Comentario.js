const db = require('../config/database');

class Comentario {
    static async salvar(nome, email, mensagem) {
        const sql = 'INSERT INTO comentarios (nome, email, mensagem) VALUES (?, ?, ?)';
        const [resultado] = await db.execute(sql, [nome, email, mensagem]);
        return resultado;
    }

    static async listarTodos() {
        const sql = 'SELECT * FROM comentarios ORDER BY id DESC';
        const [linhas] = await db.execute(sql);
        return linhas;
    }
}

module.exports = Comentario;