require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGO_URL; 

mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB'))
.catch((e) => console.log('Error', e));