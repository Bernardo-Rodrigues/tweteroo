import express, {json} from "express"
import cors from "cors"

const server = express()

server.use(cors())
server.use(json())
server.listen(5000)

const users = []
const tweets = []

server.post("/sign-up", (req, res) => {
    if(!req.body.username || !req.body.avatar) {
        res.status(400).send("Todos os campos são obrigatórios!")
    }else{
        users.push(req.body)
        res.status(201).send("OK")
    }
})

server.post("/tweets", (req, res) => {
    const postedTweet = req.body

    if(!postedTweet.username || !postedTweet.tweet) {
        res.status(400).send("Todos os campos são obrigatórios!")
    }else{
        const tweetUser = users.find( user => user.username === postedTweet.username)

        tweets.push({...req.body, avatar: tweetUser.avatar})
        res.status(201).send("OK")
    }
})

server.get("/tweets", (req, res) => {
    res.send(tweets.slice(-10))
})