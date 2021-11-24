import React from 'react';
import { Route, Routes, useNavigate } from 'react-router';

import ClothesCreate from './ClothesCreate';
import ClothesList from './ClothesList';

export default function ClothesPage() {
  const navigate = useNavigate();
  function handleAddClick() {
    navigate('/clothes/create');
  }
  return (
    <>
      <button onClick={handleAddClick}>Add new clothes</button>
      <ClothesList />
      <Routes>
        <Route path="/create" element={<ClothesCreate />} />
      </Routes>
    </>
  );
}
