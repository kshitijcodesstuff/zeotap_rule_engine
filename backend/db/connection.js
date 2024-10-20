

const mongoose = require('mongoose');

const uri = 'mongodb+srv://21cs3027:kshitij123@cluster0.0he4h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri);

module.exports = mongoose.connection;
