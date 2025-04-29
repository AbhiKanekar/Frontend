import { withIronSessionApiRoute } from "next-iron-session";

const sessionOptions = {
    password: process.env.SESSION_SECRET, // Use a strong password for encrypting cookies
    cookieName: "user_session",
    cookieOptions: {
        httpOnly: true, // Helps to mitigate XSS attacks
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 60 * 60 * 24 * 7, // Session expires in 1 week
        path: "/", // Cookie available across the entire site
    },
};

export function withSession(handler) {
    return withIronSessionApiRoute(handler, sessionOptions);
}
