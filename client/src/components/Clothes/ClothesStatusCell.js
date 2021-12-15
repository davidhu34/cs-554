import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBasketDetailSelector } from '../../application/redux/selectors';
import { useClothesLocation } from '../../application/hooks/data';
import { getBasketDetail } from '../../application/redux/actions/basket';

export default function ClothesStatusCell({ clothes }) {
  const dispatch = useDispatch();
  const {
    data: clothesLocation = {},
    error: clothesLocationError,
    loading: clothesLocationLoading,
  } = useClothesLocation();
  const basketId = clothesLocation[clothes._id];
  const basketData = useSelector(getBasketDetailSelector(basketId));

  useEffect(() => {
    if (
      basketId &&
      (!basketData ||
        (!basketData.data && !basketData.loading && !basketData.error))
    ) {
      dispatch(getBasketDetail(basketId));
    }
  }, [dispatch, basketId, basketData]);

  const {
    data: basket,
    error: basketError,
    loading: basketLoading,
  } = basketData;
  return !basketError && basket ? (
    <>{basketLoading || clothesLocationLoading ? 'loading' : `${basket.status} (${basket.name})`}</>
  ) : (
    '-'
  );
}
