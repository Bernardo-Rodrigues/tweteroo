import express, {json} from "express"
import cors from "cors"

const server = express()

server.use(cors())
server.use(json())
server.listen(5000)

const users = []
const tweets = []

server.post("/sign-up", (req, res) => {
    users.push(req.body)
    res.send("OK")
})

server.post("/tweets", (req, res) => {
    const tweet = req.body
    const tweetUser = users.find( user => user.username === tweet.username)

    tweets.push({...req.body, avatar: tweetUser.avatar})
    res.send("OK")
})