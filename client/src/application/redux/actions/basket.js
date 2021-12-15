import {
  getPaginatedBasket,
  getBasket,
  postBasket,
  putBasket,
  deleteBasket as deleteBasketRequest,
  patchBasketStatus,
  patchBasketClothes,
} from '../../api';
import { DEFAULT_PAGINATION_LIMIT } from '../../constants';
import {
  basketPaginationSelector,
} from '../selectors';
import { basketActionTypes } from './actionTypes';
import { fetchClothesLocations } from './clothesLocation';

export const getBasketList = (options) => async (dispatch, getState) => {
  try {
    const currentPagination = basketPaginationSelector(getState());
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
      type: basketActionTypes.fetchListStart,
      page: newPagination.page,
      limit: newPagination.limit || DEFAULT_PAGINATION_LIMIT,
    });
    const {
      data,
      limit = newPagination.limit,
      skip = newPagination.page * limit,
      total,
    } = await getPaginatedBasket(options);
    dispatch({
      type: basketActionTypes.fetchListSuccess,
      data,
      limit,
      page: skip * limit,
      total,
    });
  } catch (error) {
    dispatch({
      type: basketActionTypes.fetchListError,
      error,
    });
  }
};

export const getBasketDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: basketActionTypes.fetchStart,
      id,
    });
    const data = await getBasket(id);
    dispatch({
      type: basketActionTypes.fetchSuccess,
      id: data._id,
      data,
    });
  } catch (error) {
    dispatch({
      type: basketActionTypes.fetchError,
      error,
    });
  }
};

export const createBasket = (clothesData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: basketActionTypes.createStart,
    });
    const data = await postBasket(clothesData);
    dispatch({
      type: basketActionTypes.createSuccess,
      id: data._id,
      data,
    });
  } catch (error) {
    dispatch({
      type: basketActionTypes.createError,
      error,
    });
  }
};

export const deleteBasket = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: basketActionTypes.deleteStart,
      id,
    });
    const data = await deleteBasketRequest(id);
    dispatch({
      type: basketActionTypes.deleteSuccess,
      id,
      data,
    });
  } catch (error) {
    dispatch({
      type: basketActionTypes.deleteError,
      error,
    });
  }
};

export const updateBasket = (id, clothesData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: basketActionTypes.updateStart,
      id,
      data: clothesData,
    });
    const data = await putBasket(id, clothesData);
    dispatch({
      type: basketActionTypes.updateSuccess,
      id,
      data,
    });
  } catch (error) {
    dispatch({
      type: basketActionTypes.updateError,
      error,
    });
  }
};

export const updateBasketStatus =
  (id, statusUpdate) => async (dispatch, getState) => {
    try {
      // const basket = getBasketDetailSelector(id)(getState());
      dispatch({
        type: basketActionTypes.updateStart,
        id,
      });
      const data = await patchBasketStatus(id, statusUpdate);
      dispatch({
        type: basketActionTypes.updateSuccess,
        id,
        data,
      });
      dispatch(fetchClothesLocations());
    } catch (error) {
      dispatch({
        type: basketActionTypes.updateError,
        error,
      });
    }
  };

export const updateBasketClothes =
  (id, clothesIdList, isRemove = false) => async (dispatch, getState) => {
    try {
      // const basket = getBasketDetailSelector(id)(getState());
      dispatch({
        type: basketActionTypes.updateStart,
        id,
      });
      const data = await patchBasketClothes(id, { clothesIdList, remove: isRemove });
      dispatch({
        type: basketActionTypes.updateSuccess,
        id,
        data,
      });
    } catch (error) {
      dispatch({
        type: basketActionTypes.updateError,
        error,
      });
    }
  };
