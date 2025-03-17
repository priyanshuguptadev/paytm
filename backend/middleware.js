import * as jose from 'jose'

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jose.jwtVerify(token, secretKey)
        req.userId = payload.id
        next()
    } catch (e) {
        return res.status(403).json({});
    }
}