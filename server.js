const express = require('express');
const multer = require('multer');
const cors = require('cors');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

const upload = multer({ dest: 'uploads/', storage: storage });
const baseUrl = "http://images.mercenaryusa.dev/files/";

var corsOptions = {
  origin: "http://images.mercenaryusa.dev"
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(80, () => console.log('Server started on port 80'));