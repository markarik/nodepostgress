
const express = require('express');
const app = express();
const pool = require('./connection');
const port = 5000


app.use(express.json());

/**
* Routes
*
**/
// get all todo

app.get('/todos',async(req,res)=>{

    try{
        // const {description} = req.body;
        const allTodo = await pool.query('SELECT * FROM todo');

        res.json(allTodo.rows);
    }catch(err){

        console.error(err.message);
    }
})



// get a todo

app.get('/todos/:id',async(req,res)=>{
const {id} = req.params;
    try{
        const todo = await pool.query('SELECT * FROM todo  WHERE todo_id = $1',[id]);

        res.json(todo.rows);
    }catch(err){

        console.error(err.message);
    }
})


// create todo
app.post('/todos',async(req,res)=>{

    try{
        const {description} = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *',[description]) ;

        res.json(newTodo.rows);
    }catch(err){

        console.error(err.message);
    }

});

// update todo


app.put('/todos/:id',async(req,res)=>{
        try{
            const {id} = req.params;

            const {description} = req.body;
            const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2',[description,id] ) ;
        
            res.json('todo was updated');
        }catch(err){
    
            console.error(err.message);
        }
    })

// delete todo

app.delete('/todo/:id',async(req,res)=>{

    try{
        const {id} = req.params;
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1',[id]);

        res.json('todo was deleted');
    }catch(err){

        console.error(err.message);
    }

});




app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))