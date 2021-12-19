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
import ClothesBasketManagement from './ClothesBasketManagement';
import { useClothesLocation } from '../../application/hooks/data';

import ClothesStatusCell from './ClothesStatusCell';

const clothesColumns = [
  {
    field: 'name',
    label: 'Name',
  },
  {
    field: 'type',
    label: 'Type',
  },
  {
    field: 'weight',
    label: 'Weight',
    align: 'right',
  },
  {
    field: 'status',
    label: 'Status',
    render(_, data) {
      return <ClothesStatusCell clothes={data} />;
    },
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
    name: 'weight',
    label: 'Weight',
    type: 'number',
    validation: {
      required: 'Weight is Required',
    },
  },
  {
    name: 'type',
    label: 'Type of Clothes',
    type: 'select',
    options: [
      {
        label: 'T-Shirts',
        value: 'tshirt',
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
      required: 'Type of clothes is Required',
    },
  },
];

export default function ClothesPage() {
  const {
    data: clothesLocation,
    loading: clothesLocationLoading,
    error: clothesLocationError,
  } = useClothesLocation({ refresh: true });
  const navigate = useNavigate();

  function handleAddToBasket(selectedList) {
    navigate({
      pathname: '/clothes/manage-basket',
      search: `?${createSearchParams({
        clothes: selectedList,
      })}`,
    });
  }

  function validateEditCandidate(clothesData) {
    return clothesLocation[clothesData?._id]
      ? 'Cannot edit clothes when in basket'
      : '';
  }

  function validateDeleteCandidates(clothesIdList) {
    return clothesIdList.some((clothesId) => clothesLocation[clothesId])
      ? 'Cannot delete clothes in basket(s)'
      : '';
  }

  return (
    <DataPage
      title="Clothes"
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
      deleteTitle="Delete Clothes"
      validateEditCandidate={validateEditCandidate}
      validateDeleteCandidates={validateDeleteCandidates}
      customActions={[
        {
          icon: <ShoppingBasketIcon />,
          title: 'Manage Baskets',
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
          path: '/manage-basket',
          element: <ClothesBasketManagement />,
        },
      ]}
    />
  );
}
