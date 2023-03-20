const sgMail = require("@sendgrid/mail");

require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);


const sendMail = async (data) => {
  try {
      const mail={...data, from: 'camila.hallelujah@gmail.com'};
      await sgMail.send(mail);
      return;
  } catch (error) {
      console.log('try/catch sgMail');
      throw error;
  }
}


module.exports = sendMail; 

