// FINISH THIS CONTROLLERS

import { PrismaClient } from "@prisma/client"
import { validate } from "../utils/validators.js";

const cartClient = new PrismaClient().cart


export const addToCart = async (req, res) => {
    const body = req.body;
    return
}

export const removeFromCart = async (req, res) => {
    const body = req.body;

    return
}