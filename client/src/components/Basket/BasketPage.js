import React from 'react';

import {
  createBasket,
  deleteBasket,
  getBasketList,
  updateBasket,
} from '../../application/redux/actions';
import {
  basketPaginationSelector,
  getBasketDetailSelector,
} from '../../application/redux/selectors';
import DataPage from '../DataPage';

const basketFormConfigs = [
  {
    name: 'name',
    label: 'Basket Name',
    validation: {
      required: 'Name is Required',
    },
  },
  {
    name: 'size',
    label: 'Size',
    validation: {
      required: 'Size is Required',
    },
  },
];

export default function BasketPage() {
  return (
    <DataPage
      path="/clothes"
      paginationSelector={basketPaginationSelector}
      getDataSelector={getBasketDetailSelector}
      fetchPaginationAction={getBasketList}
      updateAction={updateBasket}
      deleteAction={deleteBasket}
      createAction={createBasket}
      formConfigs={basketFormConfigs}
      createTitle="Add New Basket"
      editTitle="Edit Basket Info"
      // customActions={[
      //   {
      //     icon: <ShoppingBasketIcon />,
      //     title: 'Add Clothes',
      //     hidden(selectedList) {
      //       return selectedList.length !== 1;
      //     },
      //     onClick(e, selectedList) {
      //       e.preventDefault();
      //       handleAddClothes(selectedList);
      //     },
      //   },
      // ]}
      // customRoutes={[
      //   {
      //     path: '/add-clothes',
      //     element: <AddClothesToBasket />,
      //   },
      // ]}
    />
  );
}
