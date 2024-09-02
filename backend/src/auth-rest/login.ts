import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UserModel } from "../schema/user.schema";

const router = express.Router();

router.post("/login", (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = UserModel.find()
        .findByEmail(email)
        .then(async (user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({ err: "No user found with this credentials." });
            }

            const passwordValidity = await bcrypt.compare(
                password,
                user.password,
            );
            if (!passwordValidity) {
                return res.status(404).json({ err: "Password not matching." });
            }

            const payload = {
                _id: user._id,
                email: user.email,
                name: user.name,
                roles: user.roles,
                password: user.password,
            };

            const token = jwt.sign(
                payload,
                "secret",
                {
                    // algorithm: "RS256",
                    expiresIn: "3h",
                },
                (err, token) => {
                    if (err) {
                        console.log(err);
                    }
                    res.cookie("accessToken", token, {
                        maxAge: 3.154e10, // 1 year
                        httpOnly: true,
                        domain: "localhost",
                        path: "/",
                        sameSite: "strict",
                        secure: process.env.NODE_ENV === "production",
                    });
                    res.json({
                        success: true,
                        token: token,
                    });
                },
            );

            //   res.sendStatus(200).json({ token: token });
        });
});

export = router;
