import {
  getPaginatedClothes,
  getClothes,
  postClothes,
  putClothes,
  deleteClothes as deleteClothesRequest,
} from '../../api';
import { DEFAULT_PAGINATION_LIMIT } from '../../constants';
import { clothesPaginationSelector, userSelector } from '../selectors';
import { clothesActionTypes } from './actionTypes';

export const getClothesList = (options) => async (dispatch, getState) => {
  try {
    const { _id: userId, groupId } = userSelector(getState());
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
    options.groupId = groupId;
    options.userId = userId;
    dispatch({
      type: clothesActionTypes.fetchListStart,
      page: newPagination.page,
      limit: newPagination.limit || DEFAULT_PAGINATION_LIMIT,
    });
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
      page: Math.floor(skip / limit),
      total,
    });
    return data;
  } catch (error) {
    dispatch({
      type: clothesActionTypes.fetchListError,
      error,
    });
    throw error;
  }
};

export const getClothesDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: clothesActionTypes.fetchStart,
      id,
    });
    const { _id: userId, groupId } = userSelector(getState());
    const data = await getClothes(id, { userId, groupId });
    dispatch({
      type: clothesActionTypes.fetchSuccess,
      data,
      id,
    });
    return data;
  } catch (error) {
    dispatch({
      type: clothesActionTypes.fetchError,
      error,
    });
    throw error;
  }
};

export const createClothes = (clothesData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: clothesActionTypes.createStart,
    });
    const { _id: userId, groupId } = userSelector(getState());
    const data = await postClothes({ ...clothesData, userId, groupId });
    dispatch({
      type: clothesActionTypes.createSuccess,
      id: data._id,
      data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: clothesActionTypes.createError,
      error,
    });
    throw error;
  }
};

export const deleteClothes = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: clothesActionTypes.deleteStart,
      id,
    });
    const { _id: userId, groupId } = userSelector(getState());
    const data = await deleteClothesRequest(id, { userId, groupId });
    dispatch({
      type: clothesActionTypes.deleteSuccess,
      id,
      data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: clothesActionTypes.deleteError,
      error,
    });
    throw error;
  }
};

export const updateClothes =
  (id, clothesData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: clothesActionTypes.updateStart,
        id,
        data: clothesData,
      });
      const { _id: userId, groupId } = userSelector(getState());
      const data = await putClothes(id, { ...clothesData, userId, groupId });
      dispatch({
        type: clothesActionTypes.updateSuccess,
        id,
        data,
      });
      return data;
    } catch (error) {
      dispatch({
        type: clothesActionTypes.updateError,
        error,
      });
      throw error;
    }
  };
