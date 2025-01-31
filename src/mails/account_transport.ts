import "dotenv";

// Definir la interfaz correctamente
interface AuthConfig {
  service: string;
  auth: {
    type: string;
    user: string;
    clientId?: string;
    clientSecret?: string;
    refreshToken?: string;
    accessToken?: string; // Agregamos esta propiedad
  };
}

// Declarar `account_transport` con la estructura correcta
export const account_transport: AuthConfig = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "ventas.rayu@gmail.com",
    clientId: process.env.MAIL_GOOGLE_CLIENT_ID ?? undefined,
    clientSecret: process.env.MAIL_GOOGLE_CLIENT_SECRET ?? undefined,
    refreshToken: process.env.MAIL_GOOGLE_REFRESH_TOKEN ?? undefined,
    accessToken: process.env.MAIL_GOOGLE_ACCESS_TOKEN ?? undefined // Si lo usas
  }
};

