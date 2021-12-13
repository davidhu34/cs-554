import { getPaginatedClothes, postClothes, putClothes, deleteClothes as deleteClothesRequest } from '../../api';
import { DEFAULT_PAGINATION_LIMIT } from '../../constants';
import { clothesPaginationSelector } from '../selectors';
import { clothesActionTypes } from './actionTypes';

export const getClothesList = (options) => async (dispatch, getState) => {
  try {
    const currentPagination = clothesPaginationSelector(getState());
    if (currentPagination.loading) {
      return;
    }
    const newPagination = { ...currentPagination };
    if (options.page !== undefined) {
      newPagination.page = options.page;
    }
    if (options.limit !== undefined) {
      newPagination.limit = options.limit;
    }
    dispatch({
      type: clothesActionTypes.fetchListStart,
      page: newPagination.page,
      limit: newPagination.limit || DEFAULT_PAGINATION_LIMIT,
    });
    // const {
    //   data,
    //   page = newPagination.page,
    //   limit = newPagination.limit,
    //   total,
    // } = await getPaginatedClothes(options);
    const {
      data,
      limit = newPagination.limit,
      skip = newPagination.page * limit,
      total,
    } = await getPaginatedClothes(options);
    dispatch({
      type: clothesActionTypes.fetchListSuccess,
      data,
      limit,
      page: skip * limit,
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
    const { data } = await postClothes(clothesData);
    dispatch({
      type: clothesActionTypes.createSuccess,
      id: data._id,
      data,
    });
  } catch (error) {
    dispatch({
      type: clothesActionTypes.createError,
      error,
    });
  }
};

export const deleteClothes = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: clothesActionTypes.deleteStart,
      id,
    });
    const { data } = await deleteClothesRequest(id);
    dispatch({
      type: clothesActionTypes.deleteSuccess,
      id,
      data,
    });
  } catch (error) {
    dispatch({
      type: clothesActionTypes.deleteError,
      error,
    });
  }
};

export const updateClothes = (id, clothesData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: clothesActionTypes.updateStart,
      id,
      data: clothesData,
    });
    const data = await putClothes(id, clothesData);
    dispatch({
      type: clothesActionTypes.updateSuccess,
      id,
      data,
    });
  } catch (error) {
    dispatch({
      type: clothesActionTypes.updateError,
      error,
    });
  }
};
