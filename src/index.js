require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

/**
 * Database setup
 */
 const { MongoClient, ServerApiVersion } = require('mongodb');
 const uri = "mongodb+srv://deploy:<123>@cluster0.f03va.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
 const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 client.connect(err => {
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
 });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname,'..','tmp','uploads')))
app.use(require('./routes'));

app.listen(process.env.PORT || 3000);