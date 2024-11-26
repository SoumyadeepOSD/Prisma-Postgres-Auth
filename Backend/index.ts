'use strict';

import Hapi, { Server, Request, ResponseToolkit } from '@hapi/hapi';
import dotenv from 'dotenv';
import { signup, login, forgotPassword } from "./Controllers/UserController";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import Joi from "@hapi/joi";

dotenv.config();

const PORT = process.env.PORT || 3000;

const signupPayloadSchema = Joi.object({
    email:Joi.string().email().required().description("User's email address"),
    password:Joi.string().min(6).required().description("User's email address")
});
const loginPayloadSchema = Joi.object({
    email:Joi.string().email().required().description("User's email address"),
    password:Joi.string().required().description("User's email address")
});

const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
        title: 'API Documentation',
        version: '1.0',
        description: 'This is the API documentation for our application.',
    },
    grouping: 'tags',
    tags: [
        { name: 'user', description: 'User-related routes' },
    ],
};

const init = async () => {
    const server: Server = Hapi.server({
        port: PORT,
        host: 'localhost'
    });


    await server.register([
        Inert,
        Vision,
        {
            plugin:HapiSwagger,
            options:swaggerOptions
        }
    ]);

    // Home route
    server.route({
        method: "GET",
        path: "/",
        handler: (req: Request, h: ResponseToolkit) => {
            const responseData = {
                message: "Hello, this is main json"
            };
            return h.response(responseData).code(200);
        },
        options:{
            tags:['api'],
            description:'Home route',
            notes:'Return a welcome message'
        }
    });

    // Signup route
    server.route({
        method: "POST",
        path: "/signup",
        handler: signup,
        options: {
            tags: ['api', 'user'],
            description: 'Signup route',
            notes: 'Registers a new user with email and password',
            // validate: {
            //     payload: signupPayloadSchema, // Use Joi schema for payload
            // },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: { description: 'User registered successfully' },
                        400: { description: 'Validation error' },
                    },
                },
            },
        },
    });
    

    // Login route
    server.route({
        method: "POST",
        path: "/login",
        handler: login,
        options: {
            tags: ['api', 'user'], // For Swagger grouping
            description: 'Login route',
            notes: 'Authenticates a user using email and password',
            // validate: {
            //     params: {...loginPayloadSchema}, // Use Joi schema here
            // },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: { description: 'Login successful' },
                        401: { description: 'Invalid credentials' },
                    },
                },
            },
        },
    });

    // Forgot Password route
    server.route({
        method: "POST",
        path: "/forgot-password",
        handler: forgotPassword,
        options: {
            tags: ['api', 'user'],
            description: 'Forgot password route',
            notes: 'Password reset process',
        }
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
