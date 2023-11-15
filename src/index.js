const express = require('express');
const app = express();

require('./database');
// Motor de Plantillas: EJS
app.set("view engine", "ejs")
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./src/public"))



const userRoutes = require('./routes/UserRoute.js');
const productRoutes = require('./routes/ProductRoute.js');
const commentRoutes = require('./routes/CommentRoute.js');
const orderRoutes = require('./routes/OrderRoute.js');
const paymentRoutes = require('./routes/PaymentRoute.js');
const cartRoutes = require('./routes/CartRoute.js');
const ratingRoutes = require('./routes/RatingRoute.js');

app.use(userRoutes);
app.use(productRoutes);
app.use(commentRoutes);
app.use(orderRoutes);
app.use(paymentRoutes);
app.use(cartRoutes);
app.use(ratingRoutes);



app.listen(3000);
console.log('Server on port', 3000);    