const express=require('express')
const cors=require('cors')
const players=require('./config')
const app=express()
app.use(express.json())
app.use(cors())

app.post("/create",async(req,res)=>{
    const data=req.body
    console.log(data)
    await players.add(data)
    res.send({msg:"success"})
})
app.get('/getplayers',async(req,res)=>{
    const list=await players.get()
    res.send(list.docs)
})

app.listen(4000,()=>console.log("running on port 4000"))







