import { createSelector } from 'reselect';

export const clothesStateSelector = (state) => state.clothes;

export const clothesPaginationSelector = createSelector(
  clothesStateSelector,
  ({ pagination, idListByPage }) => {
    return {
      idList: idListByPage[pagination.page] || [],
      ...pagination,
    };
  }
);
export const getClothesDetailSelector = (id) => createSelector(
  clothesStateSelector,
  ({ stateById }) => stateById[id],
);
