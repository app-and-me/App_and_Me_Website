import rndstring from 'randomstring';

module.exports = (app, Boards, Comments) => {
    app.post('/viewBoard', async(req, res) => {
            let board = new Boards(req.body);
            let result = await Boards.findOne({ token: board.token })
            if (!result) return res.status(404).json({ message: "Board Not Found" })

            return res.status(200).json(result);
        })
        .get('/qa', (req, res) => {
            Boards.find({}).sort({ date: -1 }).exec(function(err, rawContents) { //오래된 순으로 정렬
                if (err) throw err;
                res.render('qa', { contents: rawContents });
            });
        })
}