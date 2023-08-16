const db = process.env.DATABASE;
const mongoose = require('mongoose');

mongoose.connect(db,{ useNewUrlParser:true,
    useUnifiedTopology:true}).then( () => {
console.log('connection successful');
}).catch((error)  =>  console.log(error));