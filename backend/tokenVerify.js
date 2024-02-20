import jwt from "jsonwebtoken";
const secret="1234!@#$sad"

const tokenVerify = (req, res, next) => {
    try {

        const authHeader = req.header('Authorization');
        if (!authHeader) return res.status(401).json({ error: 'Missing token' });
    
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({ error: 'Invalid token format' });
        }
    
        try {
            const decoded = jwt.verify(token, secret);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Token verification failed' });
        }
   
    } catch (error) {
        console.error("Error in token verification middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default tokenVerify;
