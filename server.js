require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./src/routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir a pasta de ficheiros estáticos (HTML/CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api', routes);

// Fallback para URLs sem rota correspondente; a API mantém respostas JSON.
app.use((request, response) => {
    if (request.path === '/api' || request.path.startsWith('/api/')) {
        return response.status(404).json({ erro: 'Rota da API não encontrada.' });
    }

    return response.status(404).type('html').send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Charada de Gotham</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body style="display:flex; justify-content:center; align-items:center; min-height:100vh; padding:24px; text-align:center;">
    <main style="width:100%; max-width:500px; padding:40px; background:#121212; border:1px solid #D21617; border-radius:10px;">
        <h1 style="color:#D21617; font-size:48px; margin-bottom:10px;">❓ 404</h1>
        <h2 style="color:#fff; margin-bottom:15px;">Sinto muito... esta página é uma charada!</h2>
        <p style="color:#ccc; margin-bottom:25px;">O endereço que tentou acessar não foi encontrado no servidor de Gotham City.</p>
        <a href="/index.html" class="button" style="text-decoration:none; display:inline-block; line-height:50px;">Voltar à Página Inicial</a>
    </main>
</body>
</html>`);
});

app.listen(PORT, () => {
    console.log(`Servidor a executar em http://localhost:${PORT}`);
});