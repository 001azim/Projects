const express = require('express')
const cors = require('cors')
const players = require('./config')

const{ addDoc,getDocs }=require('firebase/firestore')
const app = express()
app.use(express.json())
app.use(cors())

app.post("/create", async (req, res) => {
    try {
        const data = req.body
        const result = await addDoc(players,data)
        res.send({ id: result.id, msg: "success" })
    } catch (error) {
        console.error("Error adding document: ", error)
        res.status(500).send({ error: "Failed to add document" })
    }
})

app.get('/getplayers', async (req, res) => {
    try {
        const querySnapshot = await getDocs(players)
        const playerData = querySnapshot.docs.map(doc => doc.data())
        res.json(playerData)
    } catch (error) {
        console.error("Error fetching documents: ", error)
        res.status(500).send({ error: "Failed to fetch documents" })
    }
})

app.listen(4000, () => console.log("running on port 4000"));
