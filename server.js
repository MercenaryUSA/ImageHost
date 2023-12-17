const express = require('express');
const multer = require('multer');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs = require('fs');

const options = {
  key: '/domain.privatekey.pem',
  cert: '/etc/ssl/certs/domain.cert.pem'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

const upload = multer({ dest: 'uploads/', storage: storage });
const baseUrl = "https://images.mercenaryusa.dev/files/";

var corsOptions = {
  origin: "https://images.mercenaryusa.dev"
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.post('/upload', upload.single('file'), (req, res) => {
  res.send(`${baseUrl}${req.file.filename}`);
});

app.get('/files/:name', (req, res) => {
  res.sendFile(`${__dirname}/uploads/${req.params.name}`);
});

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);