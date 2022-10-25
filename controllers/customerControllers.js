const {  mailer } = require("./mailer");

exports.sendMailer = async (req, res) => {

    try{
        await mailer()
        return res.status(200).json({
            message: 'mail sent successfully!'
        })
    }catch(error){

        console.log('Error!', error)
        return res.status(500).json({
            message: 'mail not sent!'
        })
    }

    

}