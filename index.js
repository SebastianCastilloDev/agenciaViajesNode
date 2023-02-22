import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'



const app = express()

//conectar la bd
db.authenticate()
    .then( () =>{
        console.log('bd conectada')
    })
    .catch(error => console.log(error) )

const port = process.env.PORT || 4000

//definir la carpeta public
app.use(express.static('public'))

//habilitar pug
app.set('view engine', 'pug')

//middleware de express para año actual
app.use((req, res, next)=>{
    const year = new Date()
    res.locals.actualYear = year.getFullYear()
    res.locals.nombreSitio = "Agencia de Viajes"
    return next()
})

//agregar bodyparser
app.use(express.urlencoded({extended:true}))

//agregar router
app.use('/', router) //soporta todos los verbos

app.listen(port, ()=>{
    console.log(`servidor en el puerto ${port}`)
})