import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createClothes, getClothesList } from '../../application/redux/actions';

export default function ClothesCreate() {
  const [clothesData, setClothesData] = useState({ name: '', description: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleTextChange(e) {
    setClothesData({
      ...clothesData,
      name: e.target.value,
    });
  }
  function handleDescriptionChange(e) {
    setClothesData({
      ...clothesData,
      description: e.target.value,
    });
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    await dispatch(createClothes(clothesData));
    dispatch(getClothesList({ page: 0 }));
    navigate(-1);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={clothesData.name}
          onChange={handleTextChange}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          name="description"
          type="text"
          value={clothesData.description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <input type="submit" value="Add" />
      </div>
    </form>
  );
}
