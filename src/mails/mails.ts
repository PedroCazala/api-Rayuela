import nodemailer, { Transporter } from "nodemailer";
import { google } from "googleapis";
import { account_transport } from "./account_transport";

const OAuth2 = google.auth.OAuth2;

const mail_rover = async (callback: (transporter: Transporter) => void) => {
    try {
        const oauth2Client = new OAuth2(
            account_transport.auth.clientId,
            account_transport.auth.clientSecret,
            "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({
            refresh_token: account_transport.auth.refreshToken,
        });

        const accessToken = await oauth2Client.getAccessToken();
        if (!accessToken.token) {
            throw new Error("No se pudo obtener el token de acceso");
        }

        account_transport.auth.accessToken = accessToken.token;

        const transporter = nodemailer.createTransport({
            service: account_transport.service,
            auth: {
                type: "OAuth2",
                user: account_transport.auth.user,
                clientId: account_transport.auth.clientId,
                clientSecret: account_transport.auth.clientSecret,
                refreshToken: account_transport.auth.refreshToken,
                accessToken: accessToken.token,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        callback(transporter);
    } catch (error) {
        console.error("Error obteniendo el token de acceso:", error);
    }
};

// Variables generales
const _SERVER: string = process.env.HOST ?? "";
const _ID_APP_1: number = 1;
const head: string = "Bienvenido a Rayu";
const footer: string = "Gracias por usar nuestra app";

interface EmailConfig {
    url: string;
    mail: Transporter;
    app: string;
    from: string;
    to: string;
    slogan: string;
    body_bienvenida: string;
    head_bienvenida: string;
    bcc: string;
    head: string;
    footer: string;
}

type Callback = (json: EmailConfig) => void;

export function send(
    idAplicativo: string,
    // to: string,
    callback: Callback
): void {
    let id: number = 0;

    try {
        id = parseInt(idAplicativo);
    } catch (error) {
        console.error(`Error parseando idAplicativo: ${error}`);
    }

    mail_rover((emailTransporter) => {
        const json: EmailConfig = {
            url: `${_SERVER}rayu/`,
            mail: emailTransporter,
            app: "Rayu",
            from: `Rayu <${process.env.MAIL_RAYU_VENTAS}>`,
            to: "", 
            slogan: "Tu librería online",
            body_bienvenida: "Mensaje personalizado",
            head_bienvenida:
                "Hola, bienvenido a Rayu.",
            bcc: "",
            head: head,
            footer: footer,
        };

        callback(json);
    }); 
}
