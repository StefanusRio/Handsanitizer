const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jb_handsanitizer'
})


db.connect((err) => {
    if (err) throw err
    console.log('Database connected')
})

app.get('/handsanitizers', (request, res) => {
    let sql = `
    select * from handsanitizers
    `

    db.query(sql, (err, result) => {
        if (err) throw err
        res.json({
            success:true,
            message: "Your handsanitizer is ready",
            data: result
        })
    })
})
    
app.post('/handsanitizers', (request, result) => {
    let data = request.body

    let sql = `
        insert into handsanitizers (merek, detail, stock)
        values ('`+data.merek+`', '`+data.detail+`', '`+data.stock+`');
    `

    db.query(sql, (err, result) => {
        if (err) throw err
    })

    result.json({
        success: true,
        message: 'Your new handsanitizer is ready'
    })
})

app.put('/handsanitizers/:id', (request, result) => {
    let data = request.body

    let sql = `
        update handsanitizers
        set merek = '`+data.merek+`', detail = '`+data.detail+`', stock = '`+data.stock+`'
        where id = `+request.params.id+`
    `

    db.query(sql, (err, result) => {
        if (err) throw err
    })

    result.json({
        success: true,
        message: 'Data handsanitizer has been updated'
    })
})

app.delete('/handsanitizers/:id', (request, result) => {
    let sql = `
        delete from handsanitizers where id = `+request.params.id+`
    `

    db.query(sql, (err, res) => {
        if (err) throw err

    result.json({
        success: true,
        message: 'Data has been deleted'
        })
    })
})


//CRUD USER

app.get('/users', (req, res) => {
    let sql = `
    select id, nama, kota from users
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "success get all user",
            data: result
        })
    })
})

app.get('/users/:id', (req, res) => {
    let sql = `
    select * from users
    where id = `+req.params.id+`
    limit 1
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "success get user's detail",
            data: result[0]
        })
    })
})

app.post('/users', (req, res) => {
    let data = req.body

    let sql = `
    insert into users (nama, kota)
    values ('`+data.nama+`', '`+data.kota+`')
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "user created",
            data: result
        })
    })
})

app.put('/users/:id', (req, res) => {
    let data = req.body

    let sql = `
    update users
    set nama = '`+data.nama+`', kota = '`+data.kota+`'
    where id = '`+req.params.id+`'
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "data has been updated",
            data: result
        })
    })
})

app.delete('/users/:id', (req, res) => {
    let sql = `
    delete from users
    where id = '`+req.params.id+`'
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "data has been deleted",
            data: result
        })
    })
})

app.listen(3000, () => {
    console.log('App is running on port 3000')
})
