require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

const rewireStyledComponents = require('react-app-rewire-styled-components');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env);
  return config;
}
config = rewireStyledComponents(config, env, {
  ssr: true,
})
/**
 * Database setup
 */
mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
    }
);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname,'..','tmp','uploads')))
app.use(require('./routes'));

app.listen(process.env.PORT || 3000);