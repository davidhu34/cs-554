import React from 'react';
import { useNavigate } from 'react-router-dom';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

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

import BasketOperation from './BasketOperation';
import BasketClothesCell from './BasketClothesCell';

const basketColumns = [
  {
    field: 'name',
    label: 'Name',
  },
  {
    field: 'status',
    label: 'Status',
  },
  {
    field: 'size',
    label: 'Size',
  },
  {
    field: 'clothes',
    label: 'Clothes',
    render(clothes, data) {
      return <BasketClothesCell clothesIdList={clothes} />;
    },
  },
  {
    field: '_id',
    label: 'ID',
    align: 'right',
  },
];

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
    type: 'number',
    validation: {
      required: 'Size is Required',
    },
  },
];

export default function BasketPage() {
  const navigate = useNavigate();

  function handleClearBasket(selectedList) {
    navigate(`/baskets/${selectedList[0]}/operate`);
  }

  function getDisabledMessage(basketData) {
    return !basketData
      ? 'No basket data'
      : basketData?.clothes?.length > 0
      ? 'Cannot edit when basket is not empty.'
      : '';
  }

  return (
    <DataPage
      title="Clothes"
      path="/baskets"
      columns={basketColumns}
      paginationSelector={basketPaginationSelector}
      getDataSelector={getBasketDetailSelector}
      fetchPaginationAction={getBasketList}
      updateAction={updateBasket}
      deleteAction={deleteBasket}
      createAction={createBasket}
      formConfigs={basketFormConfigs}
      createTitle="Add New Basket"
      editTitle="Edit Basket Info"
      getDisabledMessage={getDisabledMessage}
      customActions={[
        {
          icon: <LocalLaundryServiceIcon />,
          title: 'Operate Basket',
          hidden(selectedList) {
            return selectedList.length !== 1;
          },
          onClick(e, selectedList) {
            e.preventDefault();
            handleClearBasket(selectedList);
          },
        },
      ]}
      customRoutes={[
        {
          path: '/:id/operate',
          element: <BasketOperation />,
        },
      ]}
    />
  );
}
