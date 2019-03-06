import rndstring from 'randomstring';

module.exports = (app, Boards, Comments) => {
    app.post('/addBoard', async(req, res) => {
            let board = new Boards(req.body);
            board.token = rndstring.generate(25);
            try {
                var result = await board.save();
            } catch (e) {
                if (e) res.send('<script type="text/javascript">alert("오류가 발생하였습니다.");  history.back();</script>');
            }
            res.send("<script type='text/javascript'>alert('질문이 등록되었습니다.'); location.href='http://appme.emirim.kr/qa';</script>");
        })
        .post('/delBoard', async(req, res) => {
            let board = new Boards(req.body);
            await Boards.remove({ token: board.token }, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send('<script type="text/javascript">alert("삭제가 완료되었습니다."); history.back();</script>');
                }
            });
        })
}