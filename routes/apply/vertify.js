module.exports = (app, Appliers) => {
    app.get('/vertify', async(req, res) => {
        var result = await Appliers.find()
        res.status(200).json(result)
    })
}