import rndstring from 'randomstring';
import moment from 'moment';

module.exports = (app, Boards, Comments) => {
    app.get('/viewBoard/:token', async(req, res) => {
            let result = await Boards.findOne({ token: req.params.token })
            if (!result) return res.status(404).json({ message: "Board Not Found" })

            // return res.status(200).json(result);
            res.render('qa_view', { item: result });

        })
        .get('/qa', (req, res) => {
            Boards.find({}).sort({ date: -1 }).exec(function(err, rawContents) { //오래된 순으로 정렬
                if (err) throw err;
                // rawContents.date = moment(rawContents.date).format('YYYY-MM-DD');
                res.render('qa', { contents: rawContents, moment: moment });
            });
        })
}