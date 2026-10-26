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

app.listen(PORT, () => {
    console.log(`Servidor a executar em http://localhost:${PORT}`);
});