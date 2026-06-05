import nodemailer from 'nodemailer';
const sendEmail = async (options) => {
    try {
        // If SMTP credentials are not fully set up, we fallback to log to console
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log('\n-----------------------------------------');
            console.log('📬 [EMAIL SIMULATOR]');
            console.log(`To: ${options.email}`);
            console.log(`Subject: ${options.subject}`);
            console.log(`Body: ${options.message}`);
            console.log('-----------------------------------------\n');
            return { success: true, simulated: true };
        }
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_PORT == '465',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        const mailOptions = {
            from: `${process.env.SMTP_FROM_NAME || '18Smell'} <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html || `<p>${options.message}</p>`,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(`Message sent: ${info.messageId}`);
        return { success: true, info };
    }
    catch (error) {
        console.error('Error sending email: ', error);
        // Even if it fails, log the details to the console for easy debugging
        console.log('\n-----------------------------------------');
        console.log('📬 [EMAIL SEND FAILURE FALLBACK]');
        console.log(`To: ${options.email}`);
        console.log(`Subject: ${options.subject}`);
        console.log(`Body: ${options.message}`);
        console.log('-----------------------------------------\n');
        return { success: false, error };
    }
};
export default sendEmail;
