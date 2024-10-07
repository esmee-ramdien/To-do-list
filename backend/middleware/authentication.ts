import { Request, Response, NextFunction } from 'express';
import expressBasicAuth from 'express-basic-auth';

export const tokenComparer = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
console.log(process.env.AUTH_TOKEN )
    if (!token) {
        res.status(401).json({ eMessage: `Access denied.` });
        return
    }


    const authorized = expressBasicAuth.safeCompare(token, process.env.AUTH_TOKEN ?? '')

    if (!authorized) {
        res.status(403).json({ message: 'Invalid token.' });
        return
    }

    next();
};
