// Central place for configuration. Values come from environment variables
// (usually the .env file, see .env.example), with the legacy `config/` folder
// as a fallback so older deployments keep working.
const path = require("path")

// Load .env from the current directory first (how the app has always worked),
// then from the project root. dotenv never overrides a value that is already set.
require("dotenv").config()
require("dotenv").config({ path: path.join(__dirname, "../.env") })

// `config` warns on every start if there is no config/ folder. That folder is optional now.
process.env.SUPPRESS_NO_CONFIG_WARNING = process.env.SUPPRESS_NO_CONFIG_WARNING || "1"
const config = require("config")

const get = (name) => process.env[name] || (config.has(name) ? config.get(name) : undefined)

module.exports = {
    PORT: get("PORT") || 3050,
    MONGODB_URI: get("MONGODB_URI"),
    TOKEN_SECRET: get("TOKEN_SECRET"),
}
