const journals = require("express").Router()
const Journal = require("../models/Journal")
const Trip = require("../models/Trip")
const { verifyToken } = require("../middleware/auth")
const { str, notFound, forbidden } = require("../http")

// A journal belongs to whoever owns its trip.
const ownsTrip = async (tripId, req) => {
    const trip = tripId ? await Trip.findById(tripId) : null
    return Boolean(trip) && trip.user.equals(req.token.user.id)
}

// Create a journal in one of your own trips
journals.post("/", verifyToken, async (req, res) => {
    const { title, slug, content, trip } = req.body
    if (typeof trip !== "string") {
        return res.status(400).json({ success: false, message: "A trip is required" })
    }
    if (!(await ownsTrip(trip, req))) return forbidden(res)

    const journal = await Journal.create({
        title: str(title),
        slug: str(slug),
        content: str(content),
        trip,
    })
    res.status(201).json(journal)
})

// Update one of your own journals
journals.post("/id", verifyToken, async (req, res) => {
    const journal = await Journal.findById(req.body.journalID)
    if (!journal) return notFound(res, "Journal")
    if (!(await ownsTrip(journal.trip, req))) return forbidden(res)

    const { title, slug, content } = req.body
    if (str(title) !== undefined) journal.title = title
    if (str(slug) !== undefined) journal.slug = slug
    if (str(content) !== undefined) journal.content = content
    await journal.save()

    res.status(201).json(journal)
})

// A random selection of journals for the Explore page
journals.get("/:qty", async (req, res) => {
    const qty = Number(req.params.qty)
    if (!Number.isInteger(qty) || qty < 1 || qty > 50) {
        return res.status(400).json({ success: false, message: "qty must be a number from 1 to 50" })
    }

    const random = await Journal.aggregate([{ $sample: { size: qty } }])
    // Only public author details: never the whole user (that includes email and password hash).
    const populated = await Journal.populate(random, {
        path: "trip",
        populate: { path: "user", select: "firstName lastName slug" },
    })
    res.status(200).json(populated)
})

journals.get("/id/:journalID", verifyToken, async (req, res) => {
    const journal = await Journal.findById(req.params.journalID).populate("trip")
    if (!journal) return notFound(res, "Journal")
    res.status(200).json(journal)
})

journals.get("/slug/:journalSlug", async (req, res) => {
    const found = await Journal.find({ slug: req.params.journalSlug }).populate("trip")
    res.status(200).json(found)
})

journals.get("/tripid/:tripID", async (req, res) => {
    res.status(200).json(await Journal.find({ trip: req.params.tripID }))
})

// Delete one of your own journals
journals.delete("/delete/:journalID", verifyToken, async (req, res) => {
    const journal = await Journal.findById(req.params.journalID)
    if (!journal) return notFound(res, "Journal")
    if (!(await ownsTrip(journal.trip, req))) return forbidden(res)

    await journal.deleteOne()
    res.status(200).json(journal)
})

module.exports = journals
