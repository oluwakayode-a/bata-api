import { verifyPaystackTx } from "../utils/paystack"
import { PrismaClient } from "@prisma/client"

const txClient = new PrismaClient().transaction



export const verifyTransaction = async (req, res) => {
    const reference = req.params.reference;

    const [status, response] = verifyPaystackTx(reference)

    if (!status) {
        return res.status(500).json({error: "Error occured"})
    }

    const tx = await txClient.create({
        data: {
            ref: response.reference,
            amount: response.amount,
            status: response.status
        }
    })

    res.status(200).json(tx)

}