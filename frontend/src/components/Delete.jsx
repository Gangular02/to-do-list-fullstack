import React from 'react';
import axios from 'axios';

function Delete({ itemId, onDelete }) {
  const handleDelete = () => {
    axios.post('http://localhost:4000/delete', {
      deleteItemId: itemId,
    })
      .then(result => {
        console.log(result);
        // Call the onDelete function to refresh the list after deleting
        onDelete();
      })
      .catch(err => console.log(err));
  };

  return (
    <button type="button" onClick={handleDelete}>
      Delete
    </button>
  );
}

export default Delete;
