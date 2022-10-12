const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const port = 5000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




/// [BackEnd My SQL Code Starts] 

// Creating the connection pooling of mySQL Database
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apple'
})


// ? Method : GET
// * Purpose : Fetch all the data that are in database ...
// * In SQL : SELECT * FROM DATABASE

// i.g : Getting Data From Database..

app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query('SELECT * FROM catalogs', (err, rows) => {
            connection.release() // returning the connection pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})


// ? Method : GET
// * Purpose : To get an specific product from the database
// * In SQL : SELECT * FROM database WHERE id = idNo.

//  [ /:id ] is using to set the specific id into the request url ...
app.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err


        // SELECT * FROM catalogs WHERE id = ? 
        // in here id = ? , "?" is indicating a placeholder that what should be replaced here !!!

        // [req.params.id] is for catch the request id from /:id and replaced it into .....WHERE id = ?
        // so ultimately it working like : 
        // SELECT * FROM catalogs WHERE id = [req.params.id] (the requested id via url)


        connection.query('SELECT * FROM catalogs WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // returning the connection pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})



// ? Method : DELETE
// * Purpose : To delete an specific product from the database
// * In SQL : DELETE FROM catalogs WHERE id = ?
app.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query('DELETE FROM catalogs WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // returning the connection pool

            if (!err) {
                res.send(`The product ${[req.params.id]} has been deleted `)
            } else {
                console.log(err)
            }
        })
    })
})


// ? Method : POST
// * Purpose : Add a new product to the database
// * In SQL : INSERT INTO database SET ?
app.post('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err

        const params = req.body
        connection.query('INSERT INTO catalogs SET ?', [req.body], (err, rows) => {
            connection.release() // returning the connection pool

            if (!err) {
                res.send(`The product ${params.name} has been added to the database`)
            } else {
                console.log(err)
            }
        })
    })
})



// ? Method : PUT
// * Purpose : Update the existing info of product into the database
// * In SQL : UPDATE database name = ? WHERE id = ?
app.put('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err

        const { id, name, color, quantity } = req.body
        // const updatedName = name
        // const targetID = id


        connection.query('UPDATE catalogs SET name = ? , color = ?, quantity = ? WHERE id = ?', [name, color, quantity, id], (err, rows) => {
            connection.release() // returning the connection pool

            if (!err) {
                res.send(`The product ${name} info has been updated to the database`)
            } else {
                console.log(err)
            }
        })
        console.log(`Requested Body is : ${(req.body).name}`)
    })
})
app.listen(port, () => console.log(`Listen on the port ${port}`))