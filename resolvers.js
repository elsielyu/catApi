const { cat, owner } = require('./models');
const nodemailer = require('nodemailer');

const Query = {
    test: () => 'Test Success, GraphQL server is up & running !!',
    getCat: async () => {
        const match = await cat.findOne({
            where: {
                name: 'cuteCat',
            },
        });
        const imageBase64 = new Buffer.from(match.image, 'binary').toString('base64');
        return {
            name: match.name,
            image: imageBase64,
            message: match.message,
            available: match.available,
        };
    },
    getCats: async () => {
        const matches = await cat.findAll({});
        return matches.map(match => {
            const imageBase64 = new Buffer.from(match.image, 'binary').toString('base64');
            return {
                name: match.name,
                image: imageBase64,
                message: match.message,
                available: match.available,
            };
        });
    },
    getAvailableCats: async () => {
        const matches = await cat.findAll({
            where: {
                available: true,
            },
        });
        return matches.map(match => {
            const imageBase64 = new Buffer.from(match.image, 'binary').toString('base64');
            return {
                name: match.name,
                image: imageBase64,
                message: match.message,
            };
        });
    },
 }
 const Mutation = {
    sendEmail: async (_, { id, fromName, fromEmail, message }, { dataSources }) => {
        const match = await cat.findOne({
            where: {
                id,
            },
            include: [{
                model: owner,
                as: 'owner',
            }],
        });
        const transporter = nodemailer.createTransport({
            host: '',
            port: 465,
            secure: true,
            auth: {
                user: '',
                pass: '',
            },
        });
        const mailOptions = {
            from: fromEmail,
            to: match.owner.email,
            subject: `${fromName} wants to adopt ${match.name}!`,
            text: `From ${fromEmail}: ${message}`,
        };
        const asyncSendEmail = async () => {
            return new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(`Email error: ${error}`);
                        resolve(false);
                    } else {
                        console.log(`Email sent: ${info.reponse}`);
                        resolve(true);
                    }
                });
            });
        };
        return asyncSendEmail();
    }
 }
 module.exports = { Query, Mutation }