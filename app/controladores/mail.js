var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sygfryd2006@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'sygfryd2006@gmail.com',
  to: 'sygfryd2006@yahoo.com.mx',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});