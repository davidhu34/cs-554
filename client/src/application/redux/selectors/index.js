import { createSelector } from 'reselect';

const genPagingationSelector = (dataStateSelector) =>
  createSelector(dataStateSelector, ({ pagination, idListByPage }) => {
    return {
      idList: idListByPage[pagination.page] || [],
      ...pagination,
    };
  });

const genGetDetailSelector = (dataStateSelector) => (id) =>
  createSelector(dataStateSelector, ({ stateById }) => stateById[id] || {});

export const clothesStateSelector = (state) => state.clothes;

export const basketStateSelector = (state) => state.basket;

export const clothesPaginationSelector =
  genPagingationSelector(clothesStateSelector);

export const basketPaginationSelector =
  genPagingationSelector(basketStateSelector);

export const getClothesDetailSelector =
  genGetDetailSelector(clothesStateSelector);

export const getBasketDetailSelector =
  genGetDetailSelector(basketStateSelector);
