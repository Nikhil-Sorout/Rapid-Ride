import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import {connectDb} from './config/dbConfig'
dotenv.config()

const app = express()

const server = http.createServer(app)
const port = process.env.PORT || 5000

connectDb();


app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended : true}))


const io = new Server(server)

io.on("connection",(socket)=>{
    console.log("A user is connected");

    socket.on("joinRoom", (room)=>{
        socket.join(room);
        console.log(`User joined ${room}`);
    })

    socket.on("disconnect",()=>{
        console.log('User disconnected');
    })
})

app.use("/api/common", require('./routes/commonRoutes'))
app.use("/api/passengers", require('./routes/passengerRoutes'))
app.use("/api/drivers", require('./routes/driverRoutes'))

server.listen(port, ()=>{
    console.log("Server is running on: ", port)
})