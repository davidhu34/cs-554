import React from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate, createSearchParams } from 'react-router-dom';

import {
  createClothes,
  deleteClothes,
  getClothesList,
  updateClothes,
} from '../../application/redux/actions';
import {
  clothesPaginationSelector,
  getClothesDetailSelector,
} from '../../application/redux/selectors';
import DataPage from '../DataPage';
import AddClothesToBasket from './AddClothesToBasket';

const clothesColumns = [
  {
    field: 'name',
    label: 'Name',
  },
  {
    field: 'size',
    label: 'Size',
    align: 'right',
  },
  {
    field: '_id',
    label: 'ID',
    align: 'right',
  },
];

const clothesFormConfigs = [
  {
    name: 'name',
    label: 'Clothes Name',
    validation: {
      required: 'Name is Required',
    },
  },
  {
    name: 'description',
    label: 'Description',
  },
  {
    name: 'type',
    label: 'Type of Clothes',
    type: 'select',
    options: [
      {
        label: 'Shirts',
        value: 'shirts',
      },
      {
        label: 'Pants',
        value: 'pants',
      },
      {
        label: 'Socks',
        value: 'socks',
      },
    ],
    validation: {
      required: true,
    },
  },
];

export default function ClothesPage() {
  const navigate = useNavigate();
  function handleAddToBasket(selectedList) {
    navigate({
      pathname: '/clothes/add-to-basket',
      search: `?${createSearchParams({
        clothes: selectedList,
      })}`,
    });
  }
  return (
    <DataPage
      path="/clothes"
      columns={clothesColumns}
      paginationSelector={clothesPaginationSelector}
      getDataSelector={getClothesDetailSelector}
      fetchPaginationAction={getClothesList}
      updateAction={updateClothes}
      deleteAction={deleteClothes}
      createAction={createClothes}
      formConfigs={clothesFormConfigs}
      createTitle="Add New Clothes"
      editTitle="Edit Clothes Info"
      customActions={[
        {
          icon: <ShoppingBasketIcon />,
          title: 'Add To Basket',
          hidden(selectedList) {
            return selectedList.length < 1;
          },
          onClick(e, selectedList) {
            e.preventDefault();
            handleAddToBasket(selectedList);
          },
        },
      ]}
      customRoutes={[
        {
          path: '/add-to-basket',
          element: <AddClothesToBasket />,
        },
      ]}
    />
  );
}
