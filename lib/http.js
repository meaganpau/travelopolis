// Small helpers shared by the routes.

// Only accept real strings from request bodies. This also blocks NoSQL
// injection such as { "email": { "$gt": "" } }.
const str = (value) => (typeof value === "string" ? value : undefined)

const notFound = (res, what) =>
    res.status(404).json({ success: false, message: `${what} not found` })

const forbidden = (res) =>
    res.status(403).json({ success: false, message: "You can only change your own content." })

module.exports = { str, notFound, forbidden }
