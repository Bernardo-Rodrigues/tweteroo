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

