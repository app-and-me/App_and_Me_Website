import express from 'express';
import bodyParser from 'body-parser';
// import config from './config';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '1gb',
    extended: false
}));

//module setting
import { Users, Boards, Comments } from './mongo';

// // Swagger definition
// // You can set every attribute except paths and swagger
// // https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
// let swaggerDefinition = {
//         info: { // API informations (required)
//             title: 'highthon5', // Title (required)
//             version: '1.0.0', // Version (required)
//             description: 'Honeypot API', // Description (optional)
//         },
//         host: 'localhost:3000', // Host (optional)
//         basePath: '/', // Base path (optional)
//         securityDefinitions: {
//             jwt: {
//                 type: 'apiKey',
//                 name: 'Authorization',
//                 in: 'header'
//             }
//         },
//         security: [
//             { jwt: [] }
//         ]
//     }
//     // Options for the swagger docs
// var options = {
//     // Import swaggerDefinitions
//     swaggerDefinition: swaggerDefinition,
//     // Path to the API docs
//     apis: ['./routes*.js', './parameters.yaml'],
// }

// // Initialize swagger-jsdoc -> returns validated swagger spec in json format
// var swaggerSpec = swaggerJSDoc(options)

//서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('server running');
});

require('./routes/index')(app);