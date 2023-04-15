require("./db/config");
const multer=require("multer")

const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./db/User");

const Joi=require("joi");
const TokenModel=require('./db/Token')
const crypto = require("crypto")
const cors = require("cors");
const bcrypt=require("bcryptjs");
const JWT=require('jsonwebtoken')
const fileModel=require("./db/File");

const app = express();
const sendEmail = require("./utils/sendEmail");
const jwtKey = 'fffffffzdvfgdngndncgm'
require("dotenv").config();
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(cors());   


// connect middleware for express

// const Storage=multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/files')
//   },
//   filename: function(req,file,cb){
  
//     cb(null,Date.now()+file.originalname)
//   }
// })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
   console.log(req.body)
   console.log(file)
    if(file.mimetype==="image/jpeg" || file.mimetype==='image/png' || file.mimetype==='image/jpg'){
      cb(null, '../frontend/src/Images')
    }else if(file.mimetype==='video/mp4'){
      cb(null, '../frontend/src/video')
    }else{
      cb(null, '../frontend/src/others')
    }
   
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
const uploadStorage = multer({ storage: storage })

// Single file
app.post("/upload", uploadStorage.single("file"), async (req, res,err) => {



          const newFile=new fileModel({
            name:req.body.name,
            filename:req.file.filename,
            description:req.body.description,
            genre:req.body.genre,
            file:{
              data:req.file.filename,
              contentType:req.file.mimetype},
            userId:req.body.userId,
           
          });

  //             console.log("name JSON of"+  JSON.parse(JSON.stringify(req.body)));

  //  console.log("new file"+ newFile);
         
await newFile.save();
res.redirect('http://localhost:3000/showFiles');

})





app.post("/register", async (req,res)=>{
  const schema= Joi.object({
      name: Joi.string().min(1).max(30).required(),
      email: Joi.string().min(3).max(200).email().required(),
      password:Joi.string().min(4).max(30).required(),
  })

  const {error}=schema.validate(req.body)

  if(error) return res.status(400).send(error.details[0].message)
try{
  let user= await userModel.findOne({email:req.body.email});

  if(user) return res.status(400).send("User with email already exists.....")
  
  const {name,email,password}=req.body;

  user= new userModel({
      name,email,password
  })

  const salt= await bcrypt.genSalt(10);
  user.password=await bcrypt.hash(user.password,salt);

  await user.save();
  const secretKey=process.env.SECRET_KEY;

      const token=JWT.sign({_id: user._id,name:user.name,email:user.email},secretKey,{ expiresIn: '2h' });
      res.send({auth:token,user});
  //   res.redirect('/');
}catch(error){
  res.status(500).send(error.message);
  console.log(error.message);


}





})

app.get("/getFile",async (req,res)=>{
  

  let data=await fileModel.find();
  res.send(data)


})

app.delete('/getFile/:id', async (req, res) => {
  let data = await fileModel.deleteOne({ _id: req.params.id })
  res.send(data)
})

app.post("/login",async (req,res)=>{


  const schema= Joi.object({
      email: Joi.string().min(3).max(200).email().required(),
      password:Joi.string().min(4).max(200).required(),
  })

  const {error}=schema.validate(req.body)

  if(error) return res.status(400).send(error.details[0].message)
  try{
    let user= await userModel.findOne({email:req.body.email});
    if(!user){
      res.send({ result: "No user found" })
    }
    const validPassword= await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
      res.send({ result: "No password found" })
    }

    if (user && validPassword) {
   
      JWT.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong" })
        } else {
            res.send({ user, auth: token })
        }
    })
   
   
  } else {
      res.send({ result: "No user found" })
  }


//   const secretKey=process.env.SECRET_KEY;
// JWT (payload,secretKey)

//   const token=JWT.sign({_id: user._id,name:user.name,email:user.email},secretKey);
//   res.send({auth:token,user});
// jwt (payload,secretkey)

     
      // jwt (payload,secretkey)
      // const secretKey=process.env.SECRET_KEY;
      // const token=JWT.sign({_id: user._id,name:user.name,email:user.email},secretKey);
      // res.send({auth:token,user});
  }catch(error){
      res.status(400);

  
  
  }  
})

app.post("/password-reset", async (req, res) => {
try {

    const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        console.log("email"+req.body.email)
        if (error){return res.status(400).send(error.details[0].message);}
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
          console.log("user does'nt exists")
          res.send({ result: "No user found" })
  
      }else{
        let token = await TokenModel.findOne({ userId: user._id });
        console.log("Token")
        console.log(user._id)
console.log(crypto.randomBytes(32))
        if (!token) {
            token = new TokenModel({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            });
            await token.save()
            console.log("Token"+token)
        }

        const link = `http://localhost:6969/password-reset/${user._id}/${token.token}`;
        console.log("link"+link)
        await sendEmail(user.email, "Password reset", link);

        res.send(user);
      }
	// const {email}=req.bosword reset link sent to your email account"dy;
	// 	if (error)
	// 		return res.status(400).send({ message: error.details[0].message });

	// 	let user = await userModel.findOne({ email: req.body.email });
	// 	if (!user) return res
	// 			.status(409)
	// 			.send({ message: "User with given email does not exist!" });

	// 	let token = await TokenModel.findOne({ userId: user._id });
	// 	if (!token) {
	// 		token = await new Token({
	// 			userId: user._id,
  //       token: crypto.randomBytes(32).toString("hex"),
	// 		}).save();
	// 	}

	// 	const url = `http://localhost:3000/password-reset/${user._id}/${token.token}/`;
  //   console.log("Forgot Password URL"+ url)
	// 	// await sendEmail(user.email, "Password Reset", url);

	// 	res
	// 		.status(200)
	// 		.send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

app.get("/password-reset/:userId/:token", async (req, res) => {





  try {


     

    const user = await userModel.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

		const token = await TokenModel.findOne({
			userId: user._id,
			token: req.params.token,
		});

		if (!token) return res.status(400).send({ message: "Invalid link Token" });

		// res.status(200).send("Valid Url");
    // res.render(inde, { status: "Not Verified" });
   
    res.render("index");

	} catch (error) {

		res.status(500).send({ message: "Internal Server Error" });
	}
});

app.post("/password-reset/:userId/:token", async (req, res) => {
  const { password } = req.body;

        const user = await userModel.findById(req.params.userId);
 
        if (!user) return res.status(400).send("invalid link or expired");
console.log("USer"+user)
        const token = await TokenModel.findOne({
            userId: user._id,
            token: req.params.token,
        });
      
        if (!token) return res.status(400).send("Invalid link or expired");
  try {

  
    const encryptedPassword = await bcrypt.hash(password, 10);
     console.log("encrypted"+encryptedPassword)
        await userModel.updateOne(
          {
            _id:user._id,
          },
          {
            $set: {
              password: encryptedPassword,
            },
          }
        );

        await token.delete();

        res.send("password reset sucessfully.");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


// app.post('/update-password/:id', verifyToken, async (req, res) => {
//   let data = await userModel.updateOne({ _id: req.params.id }, { $set: req.body })
//   res.send(data)
// })

app.get('/users', async (req, res) => {


   
      
  
  let data= await userModel.find();

console.log("data"+data);
  if (data.length > 0) {
      res.send(data);
     
  }

else {
res.send({ result: "No Users!" })
}

})
app.post('/update-users/:id', async (req, res) => {
  let data = await userModel.updateOne({ _id: req.params.id }, { $set: {isBlock:req.body.isBlock}} )
  console.log("update----------users"+data)
  res.send(data)
})

app.post('/update-product/:id', async (req, res) => {
  let data = await fileModel.updateOne({ _id: req.params.id }, { $set: req.body })
  res.send(data)
})

app.post('/update-self/:id', async (req, res) => {
  // let data = await fileModel.updateOne({ _id: req.params.id }, { $set: req.body })
  const {password}=req.body.password;
console.log(req.body.password)
  const salt= await bcrypt.genSalt(10);
  console.log("salt"+salt)
  const encryptedPassword=await bcrypt.hash(req.body.password,salt);

     console.log("encrypted"+encryptedPassword)
        let data= await userModel.updateOne(
          {
            _id:req.params.id,
          },
          {
            $set: {
              name:req.body.name,
              email:req.body.email,
              password: encryptedPassword,
            },
          }
        );
        let user= await userModel.findOne({email:req.body.email});
        res.send({ user })

})

app.post('/favourite-product/:id', async (req, res) => {
  console.log("rrrrrrrrrrreq"+JSON.stringify(req.body))
  let data1 = await fileModel.updateOne({ _id: req.params.id }, { $set: {isFavourite:req.body.isFavourite}} )
  let f1=await fileModel.find({favUserId: {$in: { favUserId:req.body.userId}}}) 
  console.log("FFFFFFFFFFFF!!!!!!!!!!!"+f1)
if(data1){
  if(!f1){

    let data = await fileModel.updateOne(
      {
        _id: req.params.id
      },
      {
        $set: {
     
          isFavourite:req.body.isFavourite
        },
        $push: {
          favUserId:{
            isFavourite:req.body.isFavourite,
            favUserId:req.body.favUserId
            
          }
        }
      }
    );

  console.log("ddddddddddddddddddtaaaaaaaaaaaaaaaaaaaaaaaa1"+data)
  res.send(data)
    
  }
  if(f1){
    
    let data = await fileModel.updateOne(
      {
        _id: req.params.id
      },
      {$set:{isFavourite:req.body.isFavourite},
         $push: {
          favUserId:{
            isFavourite:req.body.isFavourite,
            favUserId:req.body.favUserId
            
          }
        }
      
      }
    );
    console.log("dddddddd222222"+data)
    res.send(data)
   
  }
   
 
}


})
app.post('/search-id/:id',async (req, res) => {

 
    
  let data = await fileModel.find({ _id: req.params.id });

  if (data.length > 0) {
      res.send(data);

  } else {
      res.send({ result: "No Product Found!" })
  }
// }else{
//     console.log(error)
// }


})

app.post('/search/:key', async (req, res) => {
let data = await fileModel.find({
  "$or": [
      { "name": { $regex: req.params.key } },
      { "genre": { $regex: req.params.key } },
      { "description": { $regex: req.params.key } }

  ]
})
if (data.length > 0) {
  res.send(data)
} else {
  res.send({ result: "No Movies Found!" })
}
})
app.listen(6969);
