import { getClothesBasketLocations, patchClothesBasketLocations } from '../../api';

import { clothesLocationActionTypes } from './actionTypes';

export const fetchClothesLocations = () => async (dispatch) => {
  try {
    dispatch({
      type: clothesLocationActionTypes.fetchStart,
    });
    const data = await getClothesBasketLocations();
    dispatch({
      type: clothesLocationActionTypes.fetchSuccess,
      data,
    });
  } catch (error) {
    dispatch({
      type: clothesLocationActionTypes.fetchError,
      error,
    });
  }
};


export const removeClothesFromBaskets = (clothesIdList) => async (dispatch, getState) => {
  try {
    dispatch({
      type: clothesLocationActionTypes.fetchStart,
    });
    const data = await patchClothesBasketLocations({
      clothesIdList,
      basketId: '',
    });
    dispatch({
      type: clothesLocationActionTypes.fetchSuccess,
      data,
    });
  } catch (error) {
    dispatch({
      type: clothesLocationActionTypes.fetchError,
      error,
    });
  }
};
