import React, { useEffect, useState } from 'react';
import Create from './Create';
import Edit from './Edit';
import Delete from './Delete'; // Import the DeleteButton component
import axios from 'axios';
import './Home.css'

function Home() {
  const [list, setTodos] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    axios.get('http://localhost:4000')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  };

  const handleEdit = () => {
    // Call fetchList to update the list after editing an item
    fetchList();
    setEditingItemId(null); // Reset editing state
  };

  const handleDelete = () => {
    // Call fetchList to update the list after deleting an item
    fetchList();
  };

  return (
    <div>
      <h1 className="header">Todo List</h1>
      <Create onAdd={fetchList} />

      {list.length === 0 ? (
        <div>
          <h2>No records</h2>
        </div>
      ) : (
        <div>
          {list.map(item => (
            <div key={item.id} className='listt'>
              {editingItemId === item.id ? (
                <Edit
                  itemId={item.id}
                  currentTitle={item.title}
                  onEdit={handleEdit}
                />
              ) : (
                <>
                  <span style={{ textDecoration: item.deleted ? 'line-through' : 'none' }}>
                    {item.title}
                  </span>
                  {!item.deleted && (
                    <>
                      <button type="button" onClick={() => setEditingItemId(item.id)} className='edit'>
                        Edit
                      </button>
                      <Delete itemId={item.id} onDelete={handleDelete} />
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
