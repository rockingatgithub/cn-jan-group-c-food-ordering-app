const {  mailer } = require("./mailer");

exports.sendMailer = async (req, res) => {

    try{
        console.log(req.user,  req.body)
        await mailer( req.body.email, req.body.emailBody )
        return res.status(200).json({
            message: ''
        })
    }catch(error){

        console.log('Error!', error)
        return res.status(500).json({
            message: 'mail not sent!'
        })
    }

    

}