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
import TimeProgressCell from '../TaskProgress/TimeProgressCell';

import BasketOperation from './BasketOperation';
import BasketClothesCell from './BasketClothesCell';
import { useSelector } from 'react-redux';
import { useClothesLocation } from '../../application/hooks/data';

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
    field: 'time',
    label: 'Task time',
    render(_, data) {
      const { createdAt, time } = data.history[data.history.length - 1];
      return <TimeProgressCell start={createdAt} end={createdAt + (time || 0)} />;
    }
  },
  {
    field: 'weight',
    label: 'Weight',
    render(weight, data) {
      return `${data.currentWeight} / ${weight}`;
    }, 
  },
  {
    field: 'clothes',
    label: 'Clothes',
    render(clothes, data) {
      return <BasketClothesCell clothesIdList={clothes} />;
    },
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
    name: 'weight',
    label: 'Max Weight',
    type: 'number',
    validation: {
      required: 'Max weight is Required',
    },
  },
];

export default function BasketPage() {
  const navigate = useNavigate();
  const { data: clothesLocation = {}, loading: clothesLocationLoading, error: clothesLocationError } = useClothesLocation();

  function handleClearBasket(selectedList) {
    navigate(`/baskets/${selectedList[0]}/operate`);
  }

  function validateEditCandidate(basketData) {
    return !basketData
      ? 'No basket data'
      : basketData?.clothes?.length > 0
      ? 'Cannot edit when basket is not empty.'
      : '';
  }


  function validateDeleteCandidates(basketIdList) {
    const workingBasketIdSet = new Set(Object.values(clothesLocation));
    return basketIdList.some((basketId) => workingBasketIdSet.has(basketId))
      ? 'Cannot delete when basket is not empty'
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
      validateEditCandidate={validateEditCandidate}
      validateDeleteCandidates={validateDeleteCandidates}
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
