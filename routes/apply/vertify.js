module.exports = (app, Appliers) => {
    app.get('/vertify', async(req, res) => {
        var result = await Appliers.find()
            // res.status(200).json(result)
        res.render('vertify', { appliers: result });
    }).post('/vertify_code', async(req, res) => {
        var code = req.body.code
    })
}