import express from 'express';
import bodyParser from 'body-parser';
import config from './config';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '1gb',
    extended: false
}));

// set the secret key
app.set('jwt-secret', config.secret)

//module setting
import { Users, Boards, Comments } from './mongo';

//서버 실행
const PORT = config.PORT;
app.listen(PORT, function() {
    console.log('server running in ' + PORT);
});

require('./routes/auth/auth')(app);
require('./routes/index')(app);