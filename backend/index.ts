import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import { Server, Socket } from 'socket.io'

dotenv.config()

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin: "https://rapid-ride.vercel.app/",
        methods: ["GET", "POST"]
    }
})

const port = process.env.PORT || 5000


app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended : true}))


app.get('/hey', async(req: express.Request, res: express.Response)=>{
    res.send("Hello from the server")
    // console.log(res);
})

server.listen(port, ()=>{
    console.log("Server is running on: ", port)
})