const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 5000;

app.use('/api/products', require('./routes/products'));

app.get('/', (req, res) => {
    res.send('Welcome to the Products API');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});