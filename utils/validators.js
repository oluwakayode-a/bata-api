import * as yup from 'yup'

// model User {
//     id        Int   @id @default(autoincrement())
//     email     String @unique
//     name      String
//     password  String
//     cart      Cart?
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }

export const validate = async (validator, data) => {
    console.log("data", data)
    try {
        const result = await validator.validate(data)
        return [true, {}]
    } catch (error) {
        return [false, { type: error.name, message: error.message }]
    }
}

export const userSchema = yup.object({
    email: yup.string().required(),
    name: yup.string().required(),
    password: yup.string().required()
})


export const productSchema = yup.object({
    brand: yup.string().required(),
    color: yup.string().required(),
    size: yup.number().required(),
    noInStock: yup.number().required(),
    price: yup.number().required()
})

export const updateProductSchema = yup.object({
    brand: yup.string(),
    color: yup.string(),
    size: yup.number(),
    noInStock: yup.number(),
    price: yup.number()
})