import rndstring from 'randomstring';
import moment from 'moment';

module.exports = (app, Boards, Comments) => {
    app.get('/viewBoard/:token', async(req, res) => {
            let result = await Boards.findOne({ token: req.params.token })
            if (!result) return res.status(404).json({ message: "Board Not Found" })

            // return res.status(200).json(result);
            res.render('qa_view', { item: result });

        })
        .get('/qa', async(req, res) => {
            let page = req.query.page;
            if (!page) page = 1;
            await Boards.count({}, function(err, c) {
                Boards.find().skip((page - 1) * 10).limit(10).sort({ date: -1 }).exec(function(err, rawContents) { //최신 순으로 정렬
                    if (err) throw err;
                    res.render('qa', { contents: rawContents, moment: moment, page: page, leng: c });
                });
            });
        })
}