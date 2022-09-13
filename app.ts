import express from 'express'
import 'dotenv/config'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 9000

//Server corriendo
const server = app.listen(PORT,()=>console.log(`🔥The server is running in http://localhost:${PORT}`))
server.on('error',(error:Error )=>console.log(`Error en el servidor ${error}`))
app.get('/',(_,res)=>{
    res.status(200).json({message:'Api de Rayuela',documentation_swagger:'Aquí ira la url'})
})