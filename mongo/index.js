import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/app_and_me_website', { useNewUrlParser: true }).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() { console.log("Mongo On"); });


let CommentSchema = mongoose.Schema({ //
    token: { type: String }, // 토큰
    comment: { type: String }, // 댓글
    email: { type: String }, // 쓴 사람
    date: { type: Date, default: Date.now } //수정 날짜
});

let BoardSchema = mongoose.Schema({ //게시판
    token: { type: String }, // 토큰
    title: { type: String }, // 제목
    content: { type: String }, // 내용
    date: { type: Date, default: Date.now }, //수정 날짜
    comments: [CommentSchema] //댓글
});

let UserSchema = mongoose.Schema({ //회원
    token: { type: String }, // 토큰
    name: { type: String }, //이름
    email: { type: String }, //이메일(아이디)
    password: { type: String }, //비밀번호
});

let ApplierSchema = mongoose.Schema({ //지원자
    token: { type: String }, // 토큰
    name: { type: String }, //이름
    student_id: { type: String }, //학번
    phone: { type: String }, //전화번호
    brief: { type: String }, //5글자 소개
    reason: { type: String }, //지원동기
    todo: { type: String } //하고싶은일
});

let DevNoteSchema = mongoose.Schema({ //개발노트
    token: { type: String }, // 토큰
    title: { type: String }, // 제목
    content: { type: String }, // 내용
    date: { type: Date, default: Date.now }, //수정 날짜
    images: [{
        id: String, //id
        url: String //url
    }], //사진
});

UserSchema.statics.create = function(name, email, password, interest_main) {
    const user = new this({
        name,
        email,
        password,
        interest_main
    });

    return user.save();
};

UserSchema.statics.findOneByEmail = function(email) {
    return this.findOne({
        email
    }).exec();
}

UserSchema.methods.verify = function(password) {
    return this.password = password
}

require('./err')(UserSchema, BoardSchema, CommentSchema, DevNoteSchema);

let Users = mongoose.model("users", UserSchema);
let Boards = mongoose.model("boards", BoardSchema);
let Comments = mongoose.model("comments", CommentSchema);
let DevNotes = mongoose.model("DevNotes", DevNoteSchema);

export { Users, Boards, Comments, DevNotes };

export default db;