import express, { Router } from "express"
import dotenv from "dotenv"
import { userRegister, loginUser } from "./controllers/user.controller.js"
import passport from "passport"
import passportAuth from "./utils/passport-auth.js"

dotenv.config()

const app = express()

app.use(express.json())

app.use(passport.initialize())
passportAuth(passport)

const port = 5000

function testAuth(req, res) {
    res.json({data: "User is logged in"})
}


app.post("/api/register", userRegister)
app.post("/api/login", loginUser)
app.get("/test-auth", passport.authenticate('jwt', { session: false }), testAuth)


app.listen(port, () => {
    console.log("Server is running on port " + port)
})