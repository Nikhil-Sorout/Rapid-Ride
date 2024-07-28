import express from 'express'
import bodyParser from 'body-parser'
import Pusher from 'pusher'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 5000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const pusher = new Pusher({
    appId: process.env.APP_ID || '', 
    key: process.env.APP_KEY || '', 
    secret:  process.env.APP_SECRET || '',
    cluster: process.env.APP_CLUSTER || '',
})
pusher.trigger("private-ride-channel", "my-event", { message: "hello world" });

app.get('/', async(req: express.Request, res: express.Response)=>{
    res.json({message: "Hello from the server"})
    // console.log(res);
})

app.post('/trigger-event', (req, res)=>{
    console.log(req.body);
    const {channel, message, event} = req.body;

    // pusher.trigger(channel, 'message', message);
    res.sendStatus(200);
})
// for authenticating users
app.get('/pusher/auth', async(req: express.Request, res: express.Response)=>{
    const query = req.query;
    const socketId = query.socket_id as string;
    const channel = query.channel_name as string;
    const callback = query.callback as string;

    const auth = JSON.stringify(pusher.authenticate(socketId, channel));
    const cb = callback.replace(/\"/g,"") + "(" + auth + ");";

    res.set({
        "Content-Type": "application/javascript"
    })
    res.send(cb);
})

app.listen(port, ()=>{
    console.log("Server is running on: ", port)
})