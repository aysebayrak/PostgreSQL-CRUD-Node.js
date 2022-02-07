import express from "express";

import postgresClient from "../config/db.js";

const router = express.Router()

//Add
router.post('/' ,async(req,res) =>{
    try {
        const text = "INSERT INTO todos ( aciklama, adi,ekleme_tarih , guncel_tarih ,durum) VALUES ($1,$2,$3,$4 ,$5 ) RETURNING*"

        const values =[req.body.aciklama, req.body.adi, req.body.ekleme_tarih, req.body.guncel_tarih,req.body.durum]

        const rows = await postgresClient.query(text,values)

        return res.status(201).json({createdTodo : rows[0] })
    } catch (error) {
        console.log('error accured ', error.message)
        return res.status(400).json({message :error.message})
        
    }
})

//update
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params 

        const text = "UPDATE todos SET aciklama = $1, adi = $2 , ekleme_tarih =$3 , guncel_tarih=$4 , durum=$5  WHERE id = $6 RETURNING *"

        const values = [req.body.aciklama, req.body.adi, req.body.ekleme_tarih,req.body.guncel_tarih,req.body.durum ,id]

        const { rows } = await postgresClient.query(text, values)
        if(!rows.length)
            return res.status(404).json({ message: 'Todo not found.' })

        return res.status(200).json({ updatedTodo: rows[0] })
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })   
    }
})

// Delete 
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const text = "DELETE FROM todos WHERE id = $1 RETURNING *"

        const values = [id]

        const { rows } = await postgresClient.query(text, values)
        if(!rows.length)
            return res.status(404).json({ message: 'Todo not found.' })

        return res.status(200).json({ deletedTodo: rows[0] })
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })   
    }
})


// Get 
router.get('/', async (req, res) => {
    try {
        const text = "SELECT * FROM todos ORDER BY id ASC"

        const { rows } = await postgresClient.query(text)

        return res.status(200).json(rows)
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })   
    }
})




export default router


