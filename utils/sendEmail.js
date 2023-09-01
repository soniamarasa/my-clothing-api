import { createTransport } from 'nodemailer';

const sendEmail = async (email, user, subject, link) => {
  try {
    const transporter = createTransport({
      host: process.env.HOST,
      port: process.env.PORT_MAIL,
      service: process.env.SERVICE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: link,
      html:
        '<div style=" color: black; font-family: Trebuchet MS;"> <h2 style="color: #ee7863"> Hello, ' +
        user +
        '.</h2>' +
        '<p> Você solicitou a redefinição de sua senha. </p> <p>Clique no botão abaixo para criar uma nova senha.</p>' +
        '<a href="' +
        link +
        '"><button  style="background-color:#2f2e41; border: none; color: white; padding: 10px 25px; text-align: center; text-decoration: none; display: inline-block; font-size: 1.2rem; border-radius: 8px; cursor: pointer !important;" >Set Password</button></a> <p> <small> Se você não solicitou a redefinição de sua senha, ignore este e-mail. </small>  </p> <h3> My Clothing </h3></div>',
    });

    console.log('email sent sucessfully');
  } catch (error) {
    console.log(error, 'email not sent');
  }
};

export default sendEmail;
