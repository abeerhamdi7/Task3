const express = require('express');
const router = express.Router();
const Reporter = require('../models/reporter');
const auth = require('../middelware/auth');


router.post('/signup', async (req, res) => {
    try {
        const reporter = new Reporter(req.body)
        await reporter.save()
        const token = await reporter.generateToken()
        res.status(200).send({
            reporter,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }

})


router.post('/login', async (req, res) => {
    try {
        const reporter = await Reporter.findByCredentials(req.body.email, req.body.password)
        const token = await reporter.generateToken()
        res.status(200).send({
            reporter,
            token
        })
    } catch (e) {
        res.status(400).send(e.message)
    }
})


router.get('/profile', auth, async (req, res) => {
    res.send(req.reporter)
})


router.patch('/update', auth, async (req, res) => {
    const _id = req.reporter._id
    try {
        const reporter = await Reporter.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).send(reporter)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete('/delete', auth, async (req, res) => {
    const _id = req.reporter._id
    try {
        const reporter = await Reporter.findByIdAndDelete(_id)
        res.send("reporter deleted successfully")
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router