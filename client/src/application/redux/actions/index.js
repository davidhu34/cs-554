import { getPaginatedClothes } from "../../api";
import { clothesActionTypes } from "./actionTypes";


export const getClothesList = (options) => async (dispatch, getState) => {
  try {
    dispatch({
      type: clothesActionTypes.fetchListStart,
    });
    const data = await getPaginatedClothes(options);
    dispatch({
      type: clothesActionTypes.fetchListSuccess,
      data,
    });
  } catch (error) {
    dispatch({
      type: clothesActionTypes.fetchListError,
      error,
    });
  }
};