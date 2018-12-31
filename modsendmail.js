exports.fcsendmail = function(from, to, subject ,message, attachfile){
	
		var nodemailer = require('nodemailer');
		
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			  auth: {
				user: 'tekamfossi@gmail.com',
				pass: '#rudy@ste#'
			  }
			});
		var mailOptions = {
			  from:from,
			  to: to,
			  subject: subject,
			  text: message,
			  attachments:attachfile
			};

		transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
				console.log(error);
			  } else {
				console.log('Email sent: ' + info.response);
			  }
		});
	};
