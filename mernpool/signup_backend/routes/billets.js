const express = require('express')
const Billet = require('./../models/billet')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('billets/new', { billet: new Billet() })
})

router.get('/edit/:_id', async (req, res) => {
    const billet = await Billet.findById(req.params._id)
    res.render('billets/edit', { billet: billet })
})

router.get('/:_id?', async (req, res) => {
    const billet = await Billet.findById(req.params._id)
    if (billet == null) res.redirect('/')
    res.render('billets/show', { billet: billet })
})

router.post('/', async (req, res, next) => {
    req.billet = new Billet()
    next()
}, saveAndRedirect('new'))

router.put('/:_id?', async (req, res, next) => {
    req.billet = await Billet.findById(req.params._id)
    next()
}, saveAndRedirect('edit'))

router.delete('/:_id', async (req, res) => {
    await Billet.findByIdAndDelete(req.params._id)
    res.redirect('/')
})

function saveAndRedirect(path) {
    return async (req, res) => {
        let billet = req.billet
        billet.title = req.body.title
        billet.description = req.body.description
        try {
            billet = await billet.save()
            res.dedirect('/billets/${ billet._id }')
        } catch (err) {
            res.render('billets/${path}', { billet: billet })
        }
    }
}

module.exports = router

