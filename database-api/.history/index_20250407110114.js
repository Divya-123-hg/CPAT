const express=require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {Pool}= require('pg');

const app=express();
const port=3000;

const pool =new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'componentsdb',
    post: 5432,
    password:'0',
});

app.use(cors());
app.use(bodyParser.json());

app.get('/api/components',async(requestAnimationFrame,res)=>{
    try{
        const result = await pool.query('select * from components');
        res.json(result.rows);
    }catch(error){
        res.status(500).send(error.message);
    }
});

app.post('/api/components', async (req,res)=>{
    const {name,description,url}=req.body;
    try{
        const result=await pool.query(
            'INSERT INTO COMPONENTS (name,description,url) values($1,$2,$3) returning *',
            [name,description,url]
        );
        res.json(result.rows[0]);
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})