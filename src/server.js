require('dotenv').config();
const express = require('express');
const router = require('./routes/routes.js');
const duvidaRoutes = require('./routes/duvidasroutes.js'); 
const respostaRoutes = require('./routes/respostaRoutes');
const categoriaRoutes = require('./routes/categoriarouts.js');

const app = express();
const porta = process.env.SERVER_PORT || 3000;
const host = process.env.SERVER_HOST || 'localhost';

app.use(express.json()); 

app.use(router);   
app.use(duvidaRoutes); 
app.use(respostaRoutes);
app.use(categoriaRoutes);


app.get("/", (req, res) => {
    res.send(`API funcionando e ouvindo em http://${host}:${porta}`);
});

app.use((err, req, res, next) => {
    console.error("Erro não capturado:", err.message);
    console.error(err.stack);
    if (!res.headersSent) { 
        res.status(500).send({ erro: 'Ocorreu um erro inesperado no servidor.' });
    }
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
