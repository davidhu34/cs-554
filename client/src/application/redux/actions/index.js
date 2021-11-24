import { getPaginatedClothes, postNewClothes } from '../../api';
import { DEFAULT_PAGINATION_COUNT } from '../../constants';
import { clothesPaginationSelector } from '../selectors';
import { clothesActionTypes } from './actionTypes';

export const getClothesList = (options) => async (dispatch, getState) => {
  try {
    if (clothesPaginationSelector(getState()).loading) {
      return;
    }
    dispatch({
      type: clothesActionTypes.fetchListStart,
      page: options.page,
      count: options.count || DEFAULT_PAGINATION_COUNT,
    });
    const {
      data,
      page = options.page,
      count = options.count,
      total,
    } = await getPaginatedClothes(options);
    dispatch({
      type: clothesActionTypes.fetchListSuccess,
      data,
      page,
      count,
      total,
    });
  } catch (error) {
    dispatch({
      type: clothesActionTypes.fetchListError,
      error,
    });
  }
};

export const createClothes = (clothesData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: clothesActionTypes.createStart,
    });
    const { data } = await postNewClothes(clothesData);
    dispatch({
      type: clothesActionTypes.createSuccess,
      id: data.id,
      data,
    });
  } catch (error) {
    dispatch({
      type: clothesActionTypes.createError,
      error,
    });
  }
};
