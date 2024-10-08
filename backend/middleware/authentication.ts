import { Request, Response, NextFunction } from 'express';
import expressBasicAuth from 'express-basic-auth';

export const tokenComparer = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ eMessage: `Access denied.` });
        return
    }

    const userAuthorized = expressBasicAuth.safeCompare(token, process.env.AUTH_USERNAME ?? '')
    const tokenAuthorized = expressBasicAuth.safeCompare(token, process.env.AUTH_PW ?? '')

    if (!userAuthorized || !tokenAuthorized) {
        res.status(403).json({ message: 'Invalid token.' });
        return
    }

    return userAuthorized && tokenAuthorized
};
