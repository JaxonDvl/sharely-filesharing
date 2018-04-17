const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');



const PORT = 3600;
const app = express();
let uploadsRoute = require('./upload');
app.server = http.createServer(app);

app.use(morgan('dev'));


app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));



app.use('/api', uploadsRoute);

// app.post('/upload', upload.array("files"),(req, res) => {
//     console.log("recevied file",req.files);
//     res.end("done");
// })

app.server.listen(process.env.PORT || PORT, () => {
    console.log(`App is running on port ${app.server.address().port}`);
});



module.exports =  app;