require("./db/config");
const multer=require("multer")

const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./db/User");
const productModel = require("./db/Product");
const Joi=require("joi");
const TokenModel=require('./db/Token')
var nodemailer = require("nodemailer");
const cors = require("cors");
const bcrypt=require("bcryptjs");
const JWT=require('jsonwebtoken')
const fileModel=require("./db/File");
const path=require("path")
const {check,validationResult}=require('express-validator')
const app = express();
const passwordComplexity = require("joi-password-complexity");
require("dotenv").config();


app.use(express.json());
app.set("view engine", "ejs")
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
    cb(null, './public/files')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
const uploadStorage = multer({ storage: storage })

// Single file
app.post("/upload", uploadStorage.single("file"), async (req, res,err) => {



console.log(req.file)
          const newFile=new fileModel({
            name:req.body.name,
            file:{
              data:req.file.filename,
              contentType:req.file.mimetype},
            userId:req.body.userId,
           
          });

              console.log("name JSON of"+  JSON.parse(JSON.stringify(req.body)));

   console.log("new file"+ newFile);
         
await newFile.save();
  return res.redirect("/login");

})





app.post("/register", async (req,res)=>{
  const schema= Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(200).email().required(),
      password:Joi.string().min(6).max(30).required(),
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
  res.send("HIIIIIII")

  let data=await fileModel.find();
  console.log(data)

})


app.post("/login",async (req,res)=>{
  const schema= Joi.object({
      email: Joi.string().min(3).max(200).email().required(),
      password:Joi.string().min(6).max(200).required(),
  })

  const {error}=schema.validate(req.body)

  if(error) return res.status(400).send(error.details[0].message)
  try{
    let user= await userModel.findOne({email:req.body.email});

  
      if(!user) return res.status(400).send("User does not exits.....");
      const validPassword= await bcrypt.compare(req.body.password,user.password);
      if(!validPassword){
          return res.status(400).send("password does not match.....");
     
      }
      // jwt (payload,secretkey)
      const secretKey=process.env.SECRET_KEY;
      const token=JWT.sign({_id: user._id,name:user.name,email:user.email},secretKey);
      res.send({auth:token,user});
  }catch(error){
      res.status(500).send(error.message);
      console.log(error.message)
  
  
  }  
})

app.post("/password-reset", async (req, res) => {
  const schema= Joi.object({

    email: Joi.string().min(3).max(200).email().required(),
  
})

const {error}=schema.validate(req.body)
  
  try {
	const {email}=req.body;
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await userModel.findOne({ email: req.body.email });
		if (!user) return res
				.status(409)
				.send({ message: "User with given email does not exist!" });

		let token = await TokenModel.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		const url = `http://localhost:3000/password-reset/${user._id}/${token.token}/`;
    console.log("Forgot Password URL"+ url)
		// await sendEmail(user.email, "Password Reset", url);

		res
			.status(200)
			.send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

app.get("/password-reset/:id/:token", async (req, res) => {
  try {
		const user = await userModel.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await TokenModel.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

app.post("/password-reset/:id/:token", async (req, res) => {
  try {
		const passwordSchema = Joi.object({
			password: passwordComplexity().required().label("Password"),
		});
		const { error } = passwordSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await userModel.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await TokenModel.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		if (!user.verified) user.verified = true;

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user.password = hashPassword;
		await user.save();
		await token.remove();

		res.status(200).send({ message: "Password reset successfully" });
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

console.log(data)
console.log("data"+data);
  if (data.length > 0) {
      res.send(data);
     
  }

else {
res.send({ result: "No Users!" })
}

})


app.listen(6969);
