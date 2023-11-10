const express = require('express');
const app = express();

require('./database');

app.use(express.json());

app.use(require("./routes/index.routes.js"));

app.use(require("./UserModel.js"));

app.use(require("./ProductModel.js"));

app.use(require("./CommentModel.js"));

app.use(require("./OrderModel.js"));

app.use(require("./CartModel.js"));

app.use(require("./RatingModel.js"));

app.use(require("./PaymentModel.js"));


app.listen(3000);
console.log('Server on port', 3000);    