import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

export default function DataEdit({ getDataSelector, updateAction }) {
  const { id } = useParams();
  const { data, error, loading } = useSelector(getDataSelector(id));
  const [formData, setFormData] = useState({ name: '', description: '', ...data });
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
    await dispatch(updateAction(id, formData));
    navigate(-1);
  }

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      ...data,
    }));
  }, [data]);

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
        <input type="submit" value="Update" />
      </div>
    </form>
  );
}
