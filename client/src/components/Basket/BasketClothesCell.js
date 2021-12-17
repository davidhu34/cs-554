import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getClothesDetailSelector } from '../../application/redux/selectors';
import { getClothesDetail } from '../../application/redux/actions/clothes';

function BasketClothesPiece({ id }) {
  const dispatch = useDispatch();
  const clothesData = useSelector(getClothesDetailSelector(id));

  useEffect(() => {
    if (
      !clothesData ||
      (!clothesData.data && !clothesData.loading && !clothesData.error)
    ) {
      dispatch(getClothesDetail(id));
    }
  }, [dispatch, id, clothesData]);

  const { data: clothesItem, loading, error } = clothesData;
  return !error && <>{loading ? 'loading' : clothesItem?.name}</>;
}

export default function BasketClothesCell({ clothesIdList }) {
  return (
    <>
      {clothesIdList.map((id) => (
        <BasketClothesPiece id={id} key={`basket-clothes-${id}`} />
      ))}
    </>
  );
}
