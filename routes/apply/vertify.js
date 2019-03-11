module.exports = (app, Appliers) => {
    app.post('/vertify', async(req, res) => {
        var result = await Appliers.find();
        // res.status(200).json(result)
        var code = req.body.code;
        if (code == 'appme678') res.render('vertify', { appliers: result });
        else res.send('<script type="text/javascript">alert("앱앤미 부원이 아닙니다!!"); history.back();</script>');
    })
}