exports.fcsendmail = function(from, to, subject ,message, attachfile){
	
		var nodemailer = require('nodemailer');
		
		var transporter = nodemailer.createTransport({
			host: 'mail.yahoo.fr',
			port: 465,
			secure:false,
			  auth: {
				user: 'tekamfossi@yahoo.fr',
				pass: 'stephanerudy'
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
