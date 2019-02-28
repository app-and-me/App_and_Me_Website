import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import config from './config';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '1gb',
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set the secret key
app.set('jwt-secret', config.secret)

//module setting
import { Users, Boards, Comments, DevNotes, Appliers } from './mongo';

//서버 실행
const PORT = config.PORT;
app.listen(PORT, function() {
    console.log('server running in ' + PORT);
});

require('./routes/auth/auth')(app, Users);
require('./routes/apply/apply')(app, Appliers);
require('./routes/index')(app);