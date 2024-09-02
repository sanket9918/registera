import jwt from "jsonwebtoken";

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, "secret", {
        ...(options && options),
        // algorithm: "RS256",
    });
}

export function verifyJwt<T>(token: string): T | null {
    try {
        const decoded = jwt.verify(token, "secret") as T;
        return decoded;
    } catch (e) {
        return null;
    }
}
