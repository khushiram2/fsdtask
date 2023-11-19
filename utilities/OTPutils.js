import speakeasy from "speakeasy"
import { OTPModel } from "../model/OtpModel.js"
import { hashPassword } from "./passwordUtils.js"





export const generateOTP = async (newRegistedUser, res) => {
    try {
        const secret = speakeasy.generateSecret({ length: 22 })

        const OTP = speakeasy.totp({
            secret: secret.base32,
            step: 300,
            encoding: "base32",
            ttl: 300
        })

        const hashedOTP = await hashPassword(OTP)
        await OTPModel.create({ userId: newRegistedUser._id, email: newRegistedUser.email, hashedOTP: hashedOTP })
        return OTP
    } catch (error) {
        console.log({where:"generating otp",error:error})
        res.status(500).send("error occured while generating Otp")
    }

}
