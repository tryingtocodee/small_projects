import nodemailer from "nodemailer"

const clientUrl = process.env.CLIENT_URL

const createTransporter = () =>{
    return nodemailer.createTransport({
        service : "gmail",
        host : "smtp.gmail.email",
        port : 587,
        secure : false ,
        auth : {
            user : process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD
        }
    })
}


const sendVerificationEmail = async(email : string , emailToken : string ) =>{
    const transport = createTransporter()

    const mailOptions = {
        from :{
            name : "ecommerce app" ,
            address : process.env.EMAIL_USERNAME
        },
        to : email,
        subject : "Verify your email for Ecommerce app" ,
        text : "hello" ,
        html : `
        <h1>Email Verification</h1>
        <p>Click here to verify you email : </p>
        <a href="${clientUrl}/verify-email/?token=${emailToken}"> </a>
        <p>You can ignore this email if you didnt create the id </p>
        `
    }

    try {
        //@ts-ignore
        transport.sendMail(mailOptions)
        console.log("verification email send " , email)
    } catch (error : any) {
        console.log("error in sendVerifcation email " , error.message)
        return 
    }
}

export default sendVerificationEmail