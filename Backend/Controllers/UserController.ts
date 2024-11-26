import bcrypt from "bcryptjs";
import prisma from "../DB/db.config";
import jwt from "jsonwebtoken";
import {Request, ResponseToolkit} from "@hapi/hapi";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

interface payloadType{
    email:string;
    password:string;
}

export const signup = async (req:Request, res:ResponseToolkit) => {
    const { email, password } = req.payload as payloadType;

    const findUser = await prisma.user.findUnique({
        where: { email }
    });

    if (findUser) {
        return res.response({
            status: 400,
            message: "Email already exists"
        }).code(400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });

    return res.response({
        status: 200,
        data: newUser,
        message: "User created successfully"
    }).code(200);
};



export const login = async (req:Request, res:ResponseToolkit) => {
    const { email, password } = req.payload as payloadType;

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return res.response({
            status: 400,
            message: "Invalid email or password"
        }).code(400);
    }

    const isPasswordValid = bcrypt.compare(password, user?.password!);

    if (!isPasswordValid) {
        return res.response({
            status: 400,
            message: "Invalid email or password"
        }).code(400);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    return res.response({
        status: 200,
        token,
        message: "Login successful"
    }).code(200);
};



export const forgotPassword = async (req:Request, res:ResponseToolkit) => {
    const { email, newPassword } = req.payload as {email:string; newPassword:string};

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return res.response({
            status: 404,
            message: "Email not found"
        }).code(404);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { email },
        data: { password: hashedPassword }
    });

    return res.response({
        status: 200,
        message: "Password updated successfully"
    }).code(200);
};
