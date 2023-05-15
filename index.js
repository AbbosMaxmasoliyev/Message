require("dotenv").config()
const express =  require("express")
const mongoose =  require("mongoose")


const path = require("path")
const app = express()


app.use(express.json())

app.use('/', express.static('assets'));



const MessageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now()
    }
  });
  

const Message = mongoose.model('Message',MessageSchema);



mongoose.connect(`mongodb+srv://aliabbos:${process.env.KEY}@cluster3.nslyzfw.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('MongoDBga ulanish muvaffaqiyatli amalga oshirildi', res.Collection))
  .catch((err) => console.log(err));


app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "/index.html"))
})
app.post("/message", (req,res)=>{
        
    const message = new Message({...req.body});
      
      message.save().then((response)=> {

          res.json({msg:"Success"})
    }).catch(err=>{
        res.json({err:err})
        
      });
    
})


app.get("/all",async(req, res)=>{
    const posts = await Message.find()
    res.json({msg:posts})
})

app.listen(5000, ()=>{
    console.log("server is running in 5000 port");
})