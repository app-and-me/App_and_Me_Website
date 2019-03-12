import config from '../../config';

module.exports = (app, Appliers) => {
    app.post('/vertify', async(req, res) => {
        // var result = await Appliers.find().sort({ student_id: -1 });
        // res.status(200).json(result)
        var code = req.body.code;
        await Appliers.count({}, function(err, c) {
            Appliers.find().sort({ student_id: 1 }).exec(function(err, rawContents) { //학번 순으로 정렬
                if (err) throw err;
                if (code == config.code) res.render('vertify', { appliers: rawContents });
                else res.send('<script type="text/javascript">alert("앱앤미 부원이 아닙니다!!"); history.back();</script>');
            });
        });
    })
}