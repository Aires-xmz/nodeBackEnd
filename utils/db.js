const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hy', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
const Users = mongoose.model('users', {
    username: String,
    password: String,
    pic:String,
    signature:String,
    sex:Number,
    birthday:String,
    tel:Number
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


const Admin = mongoose.model('admin',{
    adminname:String,
    password:String
})

const Goods = mongoose.model('goods',{
    dep:String,
    des:String,
    depdate:String,
    deptime:String,
    desdate:String,
    destime:String,
    fare:Number,
    producttime:String
})

module.exports = {
    Users,
    Positions,
    Admin,
    Goods
}


