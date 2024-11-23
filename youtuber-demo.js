// express 모듈 셋팅
const express = require('express')
const app = express()
app.listen(1234)

// 데이터 셋팅
let youtuber1 = {
    name : "Hyun",
    channelTitle : "Hyun Coding",
    date : "2024-11-20"
}

let youtuber2 = {
    name : "Ju",
    channelTitle : "Ju Coding",
    date : "2024-11-21"
}

let youtuber3 = {
    name : "Kim",
    channelTitle : "Kim Coding",
    date : "2024-11-22"
}

let db = new Map() // key,value쌍 = json
var id = 1
db.set(id++, youtuber1)
db.set(id++, youtuber2)
db.set(id++, youtuber3)

// REST API 설계
// 전체 유튜버 조회
app.get("/youtubers", (req, res) => {
    
    // //첫 번째 방법
    // var youtubers = {}
    // db.forEach(function(value, key){
    //     youtubers[key] = value
    // });

    // res.json(youtubers)

    // 두 번째 방법
    var youtubers = {}
    db.forEach(function(youtuber){
        youtubers[youtuber.channelTitle] = youtuber
    })

    res.json(youtubers)
})


// 개별 유튜버 조회
app.get('/youtubers/:id',function(req,res ){
    let {id} = req.params
    id = parseInt(id)

    const youtuber = db.get(id)
    if (youtuber == undefined){
        res.json({
            message : "등록되지 않은 유튜버입니다."
        })
    }else {
        res.json(youtuber)
    }
})

// 유튜버 등록
// json이라는 미들웨어를 사용하면 req로 날아오는 body값을 json으로 읽을 수 있음
app.use(express.json()) 
app.post('/youtubers', (req, res) => {
    console.log(req.body)
    // 등록 => Map(db)에 저장해줘야함
    db.set(id++, req.body)

    res.json({
        message : `${db.get(id - 1).channelTitle}님, 유튜버가 되신 것을 축하드립니다!`
    })
})