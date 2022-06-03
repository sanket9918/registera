import express, { Request, Response } from 'express';
import { UserModel } from '../schema/user.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

const router = express.Router();

const publicKey = Buffer.from(config.get<string>('publicKey'), 'base64').toString('ascii');

const privateKey = Buffer.from(config.get<string>('privateKey'), 'base64').toString('ascii');

router.post('/login', (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = UserModel.find()
    .findByEmail(email)
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ err: 'No user found with this credentials.' });
      }

      const passwordValidity = await bcrypt.compare(password, user.password);
      if (!passwordValidity) {
        return res.status(404).json({ err: 'Password not matching.' });
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
        privateKey,
        {
          algorithm: 'RS256',
          expiresIn: '3h',
        },
        (err, token) => {
          res.cookie('accessToken', token, {
            maxAge: 3.154e10, // 1 year
            httpOnly: true,
            domain: 'localhost',
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
          });
          res.json({
            success: true,
            token: token,
          });
        }
      );

      //   res.sendStatus(200).json({ token: token });
    });
});

export = router;
