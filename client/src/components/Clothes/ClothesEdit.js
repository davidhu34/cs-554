import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getClothesList, updateClothes } from '../../application/redux/actions';
import { getClothesDetailSelector } from '../../application/redux/selectors';

export default function ClothesEdit() {
  const { id } = useParams();
  const { data, error, loading } = useSelector(getClothesDetailSelector(id));
  const [clothesData, setClothesData] = useState({ name: '',description: '',...data });
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
    await dispatch(updateClothes(id, clothesData));
    navigate(-1);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Name</label>
        <input name="name" type="text" value={clothesData.name} onChange={handleTextChange} />
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
        <input type="submit" value="Update" />
      </div>
    </form>
  );
}
