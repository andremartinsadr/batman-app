const Comentario = require('../models/Comentario');

exports.criarComentario = async (request, response) => {
    const { nome, email, mensagem, nota } = request.body || {};
    const notaNormalizada = Number(nota);

    if (
        typeof nome !== 'string' ||
        typeof email !== 'string' ||
        typeof mensagem !== 'string' ||
        !nome.trim() ||
        !email.trim() ||
        !mensagem.trim() ||
        !Number.isInteger(notaNormalizada) ||
        notaNormalizada < 1 ||
        notaNormalizada > 5
    ) {
        return response.status(400).json({ erro: 'Preencha todos os campos e informe uma nota de 1 a 5.' });
    }

    const nomeNormalizado = nome.trim();
    const emailNormalizado = email.trim();
    const mensagemNormalizada = mensagem.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado)) {
        return response.status(400).json({ erro: 'Informe um endereço de e-mail válido.' });
    }

    try {
        await Comentario.salvar(nomeNormalizado, emailNormalizado, mensagemNormalizada, notaNormalizada);
        return response.status(201).json({ mensagem: 'Comentário gravado com sucesso!' });
    } catch (error) {
        console.error('Erro ao guardar comentário:', error);
        return response.status(500).json({ erro: 'Erro no servidor.' });
    }
};

exports.obterComentarios = async (request, response) => {
    try {
        const comentarios = await Comentario.listarTodos();
        return response.status(200).json(comentarios);
    } catch (error) {
        console.error('Erro ao procurar comentários:', error);
        return response.status(500).json({ erro: 'Erro ao procurar comentários.' });
    }
};