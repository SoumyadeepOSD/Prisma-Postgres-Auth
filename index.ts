'use strict';

import Hapi, { Server, Request, ResponseToolkit } from '@hapi/hapi';
import dotenv from 'dotenv';
import { signup, login, forgotPassword } from "./Controllers/UserController";

dotenv.config();

const PORT = process.env.PORT || 3000;

const init = async () => {
    const server: Server = Hapi.server({
        port: PORT,
        host: 'localhost'
    });

    // Home route
    server.route({
        method: "GET",
        path: "/",
        handler: (req: Request, h: ResponseToolkit) => {
            const responseData = {
                message: "Hello, this is main json"
            };
            return h.response(responseData).code(200);
        }
    });

    // Signup route
    server.route({
        method: "POST",
        path: "/signup",
        handler: signup
    });

    // Login route
    server.route({
        method: "POST",
        path: "/login",
        handler: login
    });

    // Forgot Password route
    server.route({
        method: "POST",
        path: "/forgot-password",
        handler: forgotPassword
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
    console.error(err);
    process.exit(1);
});

// Start the server
init();
