const { TOKEN_SECRET } = require("./settings")

if (!TOKEN_SECRET) {
    console.error("TOKEN_SECRET is not set. Set it in .env (see README.md).")
    process.exit(1)
}

const key = new TextEncoder().encode(TOKEN_SECRET)

// Login sessions last this long, then the user has to log in again.
const EXPIRES_IN = "30d"

// jose is an ES module, so it is loaded with import() from this CommonJS file.
const create = async (user) => {
    const { SignJWT } = await import("jose")
    return new SignJWT({ user: { id: String(user._id) } })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(EXPIRES_IN)
        .sign(key)
}

// Throws if the token is invalid, tampered with, expired, or has no expiry.
// (Tokens issued before expiry was added have no `exp` and are rejected on purpose.)
const verify = async (token) => {
    const { jwtVerify } = await import("jose")
    const { payload } = await jwtVerify(token, key, {
        algorithms: ["HS256"],
        requiredClaims: ["exp"],
    })
    return payload
}

module.exports = { create, verify }
