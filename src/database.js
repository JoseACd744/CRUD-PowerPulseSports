const mongoose = require('mongoose');


//ENV PROD
//mongoose.connect('mongodb://database/powerpulsesports_db')

//ENV DEV
mongoose.connect("mongodb://localhost:27017/powerpulsesports_db")
.then((db=>console.log("DB is connected to ", db.connection.host))).catch(err=>console.error(err));


