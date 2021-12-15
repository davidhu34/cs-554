import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosGet } from '../../application/api/utils';

import { updateBasketClothes } from '../../application/redux/actions/basket';
import DataModal from '../DataPage/DataModal';

export default function AddClothesToBasket() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [basketId, setBasketId] = useState('');

  const clothesSearchParam =
    new URLSearchParams(location.search).get('clothes') || '';
  const clothesIdList = clothesSearchParam ? clothesSearchParam.split(',') : [];
  // const baskets = useActiveBaskets();
  const [baskets, setBaskets] = useState([]);

  useEffect(() => {
    async function getPendingBaskets() {
      const baskets = await axiosGet('/baskets/pending');
      setBaskets(baskets);
      setBasketId(baskets[0]._id);
    }
    getPendingBaskets();
  }, []);

  function handleSelectBasket(e) {
    setBasketId(e.target.value);
  }

  function handleClose() {
    navigate(-1);
  }

  function handlePutClothesToBasket() {
    console.log(clothesIdList, basketId);
    if (clothesIdList.length > 0) {
      dispatch(updateBasketClothes(basketId, clothesIdList));
    }
    handleClose();
  }

  return (
    <DataModal open onClose={handleClose}>
      put {clothesIdList.length} piece of clothes into basket
      <select defaultValue={baskets[0]?._id} value={basketId} onChange={handleSelectBasket}>
        {baskets.map(({_id, name}) => (
          <option key={_id} value={_id}>{name}</option>
        ))}
      </select>
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePutClothesToBasket();
        }}
      >
        ok
      </button>
    </DataModal>
  );
}
