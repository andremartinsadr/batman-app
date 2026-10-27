const db = require('../config/database');

class Comentario {
    static async salvar(nome, email, mensagem, nota) {
        const sql = 'INSERT INTO comentarios (nome, email, mensagem, nota) VALUES (?, ?, ?, ?)';
        const [resultado] = await db.execute(sql, [nome, email, mensagem, nota]);
        return resultado;
    }

    static async listarTodos() {
        const sql = 'SELECT id, nome, mensagem, nota, data_criacao FROM comentarios ORDER BY data_criacao DESC, id DESC';
        const [linhas] = await db.execute(sql);
        return linhas;
    }
}

module.exports = Comentario;