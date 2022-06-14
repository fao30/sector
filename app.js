const fs = require("fs");
const express = require("express");
const routers = require("./routers");
const cors = require("cors");
const app = express();
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');


const port = 3000;

app.use(morgan('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload({
createParentPath: true
}));
app.use(express.static('uploads'))

  

app.use("/", routers);

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
