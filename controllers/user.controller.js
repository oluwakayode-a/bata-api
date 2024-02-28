import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { hashPassword } from "../utils/password.js"
import jsonwebtoken from "jsonwebtoken"
import { validate, userSchema } from "../utils/validators.js"

const client = new PrismaClient()
const userClient = client.user

const cartClient = client.cart

const { sign } = jsonwebtoken


export const userRegister = async (req, res) => {
    const body = req.body;

    // Validate data
    const [result, error] = await validate(userSchema, body)

    if (!result) {
        return res.status(400).json(error)
    }

    const password = await hashPassword(body.password)

    const user = await userClient.create({
        data: {
            name: body.name,
            email: body.email,
            password: password
        }
    })

    const userCart = await cartClient.create({
        data: {
            user: user
        }
    })

    res.status(201).json({data : user})
}



export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if email exists.
    const user = await userClient.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        res.status(400).json({error: "Invalid email or password"})
    }
    
    const passwordCorrect = await bcrypt.compare(password, user.password)
    
    if (!passwordCorrect) {
        res.status(400).json({error: "Invalid email or password"})
    }

    const userData = user

    delete userData.password

    const token = sign(
        { email: user.email, date: new Date().toString() },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
    );


    res.status(200).json({message: "Login successful", token: token, data : userData})

}