require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const cookieParser = require('cookie-parser')


const  PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)

app.get("/", (req, res)=>{
    res.status(200).json({message: 'Work'})
})

const start = async ()=>{
    try {
        app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
    }
    catch (e){
        console.log(e)
    }
}
start()

