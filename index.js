import express, {json} from "express"
import cors from "cors"
import { check, validationResult } from "express-validator"

const server = express()

server.use(cors())
server.use(json())
server.listen(5000, ()=>{
    console.log(`Server listening on PORT 5000!`)
})

const users = []
const tweets = []

server.post(
    "/sign-up", 
    check(["username", "avatar"]).isLength({ min: 1 }),
    (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) res.status(400).send("Todos os campos são obrigatórios!")
        else{
            users.push(req.body)
            res.status(201).send("OK")
        }
})

server.post(
    "/tweets",
    check(["tweet", "User"]).isLength({ min: 1 }),
    (req, res) => {
        const errors = validationResult(req)
        const tweetUsername = req.header("User")
        
        if(!errors.isEmpty()) res.status(400).send("Todos os campos são obrigatórios!")
        else{
            const tweetUser = users.find( user => user.username === tweetUsername)

            tweets.push({...req.body, username: tweetUsername, avatar: tweetUser.avatar})
            res.status(201).send("OK")
        }
})

server.get("/tweets", (req, res) => {
    const page = req.query.page

    if(!page || page < 1) res.status(400).send("Informe uma página válida!")

    const remains = tweets.length - (page) * 10
    const firstOfPage = (page - 1) * 10

    const initial = 
    tweets.length <= 10 
    ? 0 
    : remains < 0 
    ? 0 
    : remains

    const final = 
    firstOfPage > tweets.length 
    ? 0 
    : initial === 0 
    ? tweets.length - firstOfPage 
    : initial + 10  

    res.send(tweets.slice(initial, final).reverse())
})

server.get("/tweets/:username", (req, res) => {
    const username = req.params.username
    const userTweets = tweets.filter( tweet => tweet.username === username)

    res.send(userTweets)
})