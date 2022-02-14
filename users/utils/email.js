const nodemailer = require("nodemailer");
const transporter = require('../../backend/lib/emailServer');

const SEND_EMAIL =  (name, last_name, email, password) => {

    emailContent = `
        <h1>Hola ${name} ${last_name}, bienvenido al nuevo sitio web de Licorne.</h1>
        <p>Para asegurarnos de que tengas la mejor experiencia te daremos algunas indicaciones.</p>
        <ol>
            <li>Para ingresar al panel de administración primero deberás acceder a la siguiente direccion <a href="https://admin.licorne.mx">https://admin.licorne.mx</a></li>
            <li>Deberás ingresar tu correo empresarial y la siguiente contraseña: <strong>${password}</strong></li>
            <li>Por tu seguridad y la de todo el equipo no compartas tu contraseña con nadie.</li>
            <li>Si haz olvidado o perdido tu contraseña deberas ingresar al siguiente link y seguir los pasos que se te indican.</li>
            <li>En caso de que encuenres alguna falla durante tu navegación por favor reportalo al área correspondiente.</li>
        </ol>
    `

    transporter.sendMail({
        from: 'Licorne <jsalgado@licorne.mx>',
        to: email,
        subject: 'Bienvenido al nuevo sitio web de Licorne',
        html: emailContent,
    })

    transporter.close()

}

module.exports = SEND_EMAIL