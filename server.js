const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); // <-- IMPORTANTE
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware de layout
app.use(expressLayouts);
app.set('layout', 'layout'); // layout.ejs na raiz de /views

// Middlewares gerais
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const taskRoutes = require('./routes/taskRoutes');
app.use('/', taskRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📝 Acesse o TaskManager no navegador!`);
});
