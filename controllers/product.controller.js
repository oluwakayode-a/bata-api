import { PrismaClient } from "@prisma/client"
import { productSchema, updateProductSchema, validate } from "../utils/validators.js";


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
    const allProducts = await productClient.findMany()

    res.status(200).json(allProducts)
}


export const getProductById = async (req, res) => {
    const id = req.params.id

    const product = await productClient.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!product) {
        return res.status(404).json({error: "Product not found."})
    }

    res.status(200).json(product)
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const body = req.body;


    // Validate data here
    
    const [result, error] = await validate(updateProductSchema, body)

    if (!result) {
        return res.status(400).json(error)
    }
    

    try {
        const product = await productClient.update({
            where: {
                id: parseInt(id)
            },
            data: {...body}
        })

        res.status(200).json({msg: "Product updated", data : product})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error occured"})
    }

}

export const deleteProductById = async (req, res) => {
    const id = req.params.id

    // Check if product exists.
    const product = await productClient.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!product) {
        return res.status(404).json({error: "Product not found."})
    }


    const delProduct = await productClient.delete({
        where: {
            id: parseInt(id)
        }
    })


    res.status(200).json({msg: "Product deleted"})
}

