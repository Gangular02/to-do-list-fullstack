import express from 'express';
import pg from 'pg';
import cors from 'cors'


const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"TODO",
    password:"Gang@12",
    port:5432,
});
db.connect();


const app = express();
app.use(cors());
app.use(express.json());

let items;
let i=[];

app.get("/", async(req,res)=>{
    try{
        const result = await db.query("SELECT * FROM list ORDER BY id ASC");
    items = result.rows;
    items.forEach(item => {
        i.push(item.title);
        
    });
    //res.send(items);
    res.json(items);
    console.log(i);
    //console.log(items);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

app.post("/add", async (req, res) => {
    const item = req.body.item;
    // items.push({title: item});
    try {
      await db.query("INSERT INTO list (title) VALUES ($1)", [item]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
});

app.post("/edit", async (req, res) => {
    const item = req.body.updatedItemTitle;
    const id = req.body.updatedItemId;
  
    try {
      await db.query("UPDATE list SET title = ($1) WHERE id = $2", [item, id]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
});

app.post("/delete", async (req, res) => {
    const id = req.body.deleteItemId;
    try {
      await db.query("DELETE FROM list WHERE id = $1", [id]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  });
  


app.listen(4000,()=>{
    console.log("listening at 4000");
});