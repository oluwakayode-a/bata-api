import { PrismaClient } from "@prisma/client"
import { productSchema, validate } from "../utils/validators.js";


const productClient = new PrismaClient().product


export const createProduct = async (req, res) => {
    const body = req.body;

    // Validate data here
    
    const [result, error] = await validate(productSchema, body)

    if (!result) {
        return res.status(400).json(error)
    }
    

    try {
        const product = await productClient.create({
            data: {...body}
        })

        res.status(201).json({msg: "Product created", data : product})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error occured"})
    }

}


export const listProducts = async (req, res) => {
    
}