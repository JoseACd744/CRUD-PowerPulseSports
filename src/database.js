const mongoose = require('mongoose');


//ENV PROD
//mongoose.connect('mongodb://database/mydatabase')

//ENV DEV
mongoose.connect("mongodb://localhost:27017/mydb")
.then((db=>console.log("DB is connected to ", db.connection.host))).catch(err=>console.error(err));


