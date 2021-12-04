import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export default function DataCreate({ createAction, fetchPaginationAction }) {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleTextChange(e) {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  }
  function handleDescriptionChange(e) {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    await dispatch(createAction(formData));
    dispatch(fetchPaginationAction({ page: 0 }));
    navigate(-1);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Name</label>
        <input name="name" type="text" value={formData.name} onChange={handleTextChange} />
      </div>
      <div>
        <label>Description</label>
        <input
          name="description"
          type="text"
          value={formData.description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <input type="submit" value="Add" />
      </div>
    </form>
  );
}
