import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import favicon from 'serve-favicon';
import config from './config';

let app = express();
app.use(favicon(__dirname + '/public/img/favicon.ico', { maxAge: 2592000000 }));

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log('server running in ' + PORT);
});

require('./routes/auth/auth')(app, Users);
require('./routes/apply/apply')(app, Appliers);
require('./routes/board/setBoard')(app, Boards, Comments);
require('./routes/board/viewBoard')(app, Boards, Comments);
require('./routes/index')(app);