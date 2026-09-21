const trips = require("express").Router()
const Trip = require("../models/Trip")
const Journal = require("../models/Journal")
const { verifyToken } = require("../middleware/auth")
const { str, notFound, forbidden } = require("../http")

const isOwner = (trip, req) => trip.user.equals(req.token.user.id)

// Create a trip for the logged-in user
trips.post("/", verifyToken, async (req, res) => {
    const trip = await Trip.create({
        user: req.token.user.id,
        name: str(req.body.name),
        slug: str(req.body.slug),
    })
    res.status(201).json(trip)
})

// Update one of your own trips
trips.post("/id", verifyToken, async (req, res) => {
    const trip = await Trip.findById(req.body.tripID)
    if (!trip) return notFound(res, "Trip")
    if (!isOwner(trip, req)) return forbidden(res)

    if (str(req.body.name) !== undefined) trip.name = req.body.name
    if (str(req.body.slug) !== undefined) trip.slug = req.body.slug
    await trip.save()

    res.status(201).json(trip)
})

trips.get("/", async (req, res) => {
    res.status(200).json(await Trip.find().sort({ date: -1 }))
})

trips.get("/user/:userID", async (req, res) => {
    res.status(200).json(await Trip.find({ user: req.params.userID }))
})

trips.get("/id/:tripID", verifyToken, async (req, res) => {
    const trip = await Trip.findById(req.params.tripID).populate("user", "slug")
    if (!trip) return notFound(res, "Trip")
    res.status(200).json(trip)
})

trips.get("/slug/:tripSlug", async (req, res) => {
    res.status(200).json(await Trip.find({ slug: req.params.tripSlug }))
})

// Delete one of your own trips, and its journals
trips.delete("/delete/:tripID", verifyToken, async (req, res) => {
    const trip = await Trip.findById(req.params.tripID)
    if (!trip) return notFound(res, "Trip")
    if (!isOwner(trip, req)) return forbidden(res)

    await trip.deleteOne()
    const journal = await Journal.deleteMany({ trip: trip._id })
    res.status(200).json({ trip, journal })
})

module.exports = trips
