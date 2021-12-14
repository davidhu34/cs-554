import React from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';

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
import ChangeStatus from './ChangeStatus';

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
  const navigate = useNavigate();
  function handleUpdateStatus(selectedList) {
    navigate(`/baskets/${selectedList[0]}/change-status`);
  }

  return (
    <DataPage
      path="/baskets"
      paginationSelector={basketPaginationSelector}
      getDataSelector={getBasketDetailSelector}
      fetchPaginationAction={getBasketList}
      updateAction={updateBasket}
      deleteAction={deleteBasket}
      createAction={createBasket}
      formConfigs={basketFormConfigs}
      createTitle="Add New Basket"
      editTitle="Edit Basket Info"
      customActions={[
        {
          icon: <UpdateIcon />,
          title: 'Update Task',
          hidden(selectedList) {
            return selectedList.length !== 1;
          },
          onClick(e, selectedList) {
            e.preventDefault();
            handleUpdateStatus(selectedList);
          },
        },
        // {
        //   icon: <ShoppingBasketIcon />,
        //   title: 'Add Clothes',
        //   hidden(selectedList) {
        //     return selectedList.length !== 1;
        //   },
        //   onClick(e, selectedList) {
        //     e.preventDefault();
        //     handleAddClothes(selectedList);
        //   },
        // },
      ]}
      customRoutes={[
        {
            path: '/:id/change-status',
            element: <ChangeStatus />,
          },
        // {
        //   path: '/add-clothes',
        //   element: <AddClothesToBasket />,
        // },
      ]}
    />
  );
}
