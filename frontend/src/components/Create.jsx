import React, {useState} from 'react'
import axios from 'axios'

function Create({onAdd}) {
  const [item, setItem] = useState("");
  const handleAdd = () =>{
    axios.post('http://localhost:4000/add',{item: item})
    .then(result =>{
      console.log(result)
      onAdd();
    })
    .catch(err=>console.log(err));
  };
  return (
    <div className='add'>
        <input type="text" placeholder='Enter Task' onChange={(e)=>setItem(e.target.value)}/>
        <button type="button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create