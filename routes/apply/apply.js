import rndstring from 'randomstring';

module.exports = (app, Appliers) => {
    app.post('/apply', async(req, res) => {
        let applier = new Appliers(req.body);
        applier.token = rndstring.generate(40);
        try {
            var result = await applier.save();
        } catch (e) {
            if (e instanceof user_duplicate) return res.status(409).json({ message: "already exist" });
            if (e instanceof ValidationError) return res.status(400).json({ message: e.message });
            if (e instanceof paramsError) return res.status(400).json({ message: e.message });
        }
        res.send('<script type="text/javascript">alert("신청이 완료되었습니다. 좋은 결과 있길 바래요! :)"); location.href="http://appme.emirim.kr";</script>');
    })
}