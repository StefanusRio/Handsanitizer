const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const app = express()

const secretKey = 'thisisverysecretkey'

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

const isAuthorized = (request, result, next) => {
    if (typeof(request.headers['x-api-key']) == 'undefined') {
        return result.status(403).json({
            success: false,
            message: 'Unauthorized. Token is not provided'
        })
    }

    let token = request.headers['x-api-key']

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return result.status(401).json({
                success: false,
                message: 'Unauthorized. Token is invalid'
            })
        }
    })

    next()
}

app.post('/login', (request, result) => {
    let data = request.body

    if (data.username == 'admin' && data.password == 'admin') {
        let token = jwt.sign(data.username + '|' + data.password, secretKey)

        result.json({
            success: true,
            message: 'Login success, welcome back Admin!',
            token: token
        })
    }

    result.json({
        success: false,
        message: 'You are not person with username admin and have password admin!'
    })
})

//CRUD HANDSANITIZER

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
    
app.post('/handsanitizers', isAuthorized, (request, result) => {
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

app.put('/handsanitizers/:id', isAuthorized, (request, result) => {
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

app.delete('/handsanitizers/:id', isAuthorized, (request, result) => {
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

app.get('/users', isAuthorized, (req, res) => {
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

app.get('/users/:id', isAuthorized, (req, res) => {
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

app.post('/users', isAuthorized, (req, res) => {
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

app.put('/users/:id', isAuthorized, (req, res) => {
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

app.delete('/users/:id', isAuthorized, (req, res) => {
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

//CRUD TRANSAKSI

app.get('/users/:id/handsanitizers', isAuthorized, (req, res) => {
    db.query(`
        select users.id, users.nama, users.kota, handsanitizers.merek
        from users
        right join transaksi on users.id = transaksi.user_id
        right join handsanitizers on transaksi.handsanitizer_id = handsanitizers.id
        where users.id = '`+req.params.id+`'
    `, (err, result) => {
        if (err) throw err

        res.json({
            message: "success get user's handsanitizer",
            data: result
        })
    })
})

app.post('/handsanitizers/:id/take', isAuthorized, (req, res) => {
    let data = req.body

    db.query(`
        insert into transaksi (user_id, handsanitizer_id)
        values ('`+data.user_id+`', '`+req.params.id+`')
    `, (err, result) => {
        if (err) throw err
    })

    db.query(`
        update handsanitizers
        set stock = stock - 1
        where id = '`+req.params.id+`'
    `, (err, result) => {
        if (err) throw err
    })

    res.json({
        message: "Handsanitizer has been taked by user"
    })
})

app.put('/transaksi/:id', isAuthorized, (req, res) => {  
    let data = req.body

    let sql = `
        update transaksi
        set user_id = '`+data.user_id+`', handsanitizer_id= '`+data.handsanitizer_id+`'
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

app.delete('/transaksi/:id', isAuthorized, (req, res) => {
    let sql = `
        delete from transaksi
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
