// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors=require('cors');

// const app = express();
// app.use(cors())
// app.use(bodyParser.urlencoded({extended: false}));
// mongoose.connect('mongodb://0.0.0.0:27017/userDB')
//     .then(console.log('DB connected successfully!'))
//     .catch((err) => console.log(err));

// const userSchema = mongoose.Schema({
//     name: String,
//     email: {
//         type :String,
//         required : true
//     },
//     password:{
//         type : String,
//         required: true
//     },
//     mobile:{
//         type:Number,
//         required:true
//     }
// });
// const User = mongoose.model("User",userSchema);
// app.post("/login",(req,res) => {
//     const {email, password} = req.body;
//  User.findOne({email: email})
//  .then((user)=>{
//     if(user){
//         if(user.password === password){
//             res.send('Loged in successfully');
//         }
//     }
//     else{
//         res.send('User does not exist');
//     }
//  })
// });

// app.get("/", (req, res)=> {
//     res.send("<h1>Hello World</h1>")
// })

// app.post("/register",(req,res) =>{
//     console.log(req.body);
//     const{name,email,password,mobile} = req.body;
//     console.log(`${name}, ${email}, ${password}, ${mobile}`);
//     const user = User ({
//         name: name,
//         email: email,
//         password: password,
//         mobile: mobile
//     });
//     user.save()
//     .then(() => res.send('Registered Successfully'))
//     .catch((err) =>res.send(err));
// });

// const port = 5000;

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const md5 = require('md5');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://0.0.0.0:27017/userDB')
    .then(() => console.log('DB connected successfully!'))
    .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        require: true
    }
});

const User = mongoose.model("User", userSchema);

app.post("/login", (req, res) => {
    const {email, password} = req.body;

    const pwd = md5(password);

    console.log(req.body);

    User.findOne({email: email})
        .then((user) => {
            
            console.log(user);
            if(user) {
                if(user.password === pwd)
                    res.send({
                        'status': 'Logged in successfully!',
                        'user': user
                    });
                else
                    res.send({'status':'Invalid credentials!'});
            } else {
                res.send({'status': "User doesn't exists!"});
            }
        })
        .catch((err) => console.log(err));
});

app.post("/register", (req, res) => {
    const {name, email, password, mobile} = req.body;
    
    const user = User({
        name: name,
        email: email,
        password: md5(password),
        mobile: mobile
    });

    user.save()
        .then(() => res.send('Registered successfully!'))
        .catch((err) => res.send(err));
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
