import { PrismaClient } from "@prisma/client"
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";


const client = new PrismaClient()
const userClient = client.user

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
  
export default async (passport) => {
    passport.use(

        new JwtStrategy(options, async (jwtPayload, done) => {
            const user = await userClient.findUnique({
                where: {
                    email: jwtPayload.email
                }
            })
            
            if (!user) {
                return done(null, false)
            }
    
            return done(null, user)
        })
    )

};