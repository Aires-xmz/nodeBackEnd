const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hy', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
const Users = mongoose.model('users', {
    username: String,
    password: String,
    pic:String,
    signature:String,
    sex:Number,
    birthday:String
});

const Positions = mongoose.model('positions',{
    dep:String,
    des:String,
    depdate:String,
    deptime:String,
    desdate:String,
    destime:String,
    economyfare:String,
    firstclassfare:String
}) 

module.exports = {
    Users,
    Positions
}


