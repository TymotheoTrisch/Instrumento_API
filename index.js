const express = require('express');
const fs = require('fs');
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const instrumentos = require('./Router/instrumentos') 


const PORT = 3000
const HOSTNAME = 'http://localhost'

const server = express();
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(cors())
server.use(express.json());

server.use("/instrumentos", instrumentos);


server.listen(PORT, () => {
    console.log(`Servidor está funcionando! na porta ${HOSTNAME}:${PORT}/instrumentos`);
});