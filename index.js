
import express from "express"
import postgresClient from "./config/db.js"

import userRouter from './routers/userRouter.js'

const app= express()
app.use(express.json())

app.use('/todos' , userRouter)


const PORT = process.env.PORT || 5000

app.listen(PORT , () =>{
    console.log('listening on port ${PORT}')
    postgresClient.connect(err => {
        if(err){
          console.log('error' ,err.stack)  
        }
        else{
            console.log('success')
        }
    })
})
