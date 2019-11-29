const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const init = require('./routes/routes').init;

app.use(cors(), function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
  });

app.use(morgan('dev'))
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: false }))
// calling routes
init(app);
// app.use(express.static(path.join(__dirname, 'dist')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.html'));
// });
app.get('/', (req, res) => {
    res.send('Welcome');
})
const sqlConnectorHelper = require('./helpers/sqlConnector')

const sqlClient = sqlConnectorHelper()


sqlClient.connect(function(err) {
    if (err) {
        console.log({err});
    }
    console.log("Database Connected!");
    app.set('sql', sqlClient);
  });

module.exports = app
