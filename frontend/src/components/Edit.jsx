import React, { useState } from 'react';
import axios from 'axios';

function Edit({ itemId, currentTitle, onEdit }) {
  const [updatedTitle, setUpdatedTitle] = useState(currentTitle);

  const handleEdit = () => {
    axios.post('http://localhost:4000/edit', {
      updatedItemId: itemId,
      updatedItemTitle: updatedTitle
    })
      .then(result => {
        console.log(result);
        // Call the onEdit function to refresh the list after editing
        onEdit();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <input
        type="text"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
      />
      <button type="button" onClick={handleEdit}>
        Save
      </button>
    </div>
  );
}

export default Edit;
