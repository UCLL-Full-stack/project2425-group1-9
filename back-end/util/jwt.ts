import jwt from 'jsonwebtoken';
import { Role } from '../types';

const generateJwtToken = ({ name, role }: { name: string; role: Role }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'toddo_app' };

    try {
        return jwt.sign({ name, role }, process.env.JWT_SECRET!, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export { generateJwtToken };
