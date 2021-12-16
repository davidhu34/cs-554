import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { updateBasketClothes } from '../../application/redux/actions/basket';
import { fetchClothesLocations } from '../../application/redux/actions/clothesLocation';
import { getBasketDetailSelector } from '../../application/redux/selectors';

import DataModal from '../DataPage/DataModal';

export default function ClearBasket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: basket,
    loading,
    error,
  } = useSelector(getBasketDetailSelector(id));
  const canClear = basket && basket.status === 'PENDING';
  const isEmpty = basket && basket.clothes && basket.clothes.length === 0;

  function handleClose() {
    navigate(-1);
  }

  async function handleClearBasket() {
    if (canClear && !isEmpty) {
      await dispatch(updateBasketClothes(id, basket.clothes, true));
      await dispatch(fetchClothesLocations());
      handleClose();
    }
  }

  return (
    <DataModal open onClose={handleClose}>
      {canClear ? (
        <>Remove all clothes from basket</>
      ) : isEmpty ? (
        <>Basket isEmpty</>
      ):(
        <>Cannot clear basket while washing/drying</>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          handleClearBasket();
        }}
      >
        ok
      </button>
    </DataModal>
  );
}
