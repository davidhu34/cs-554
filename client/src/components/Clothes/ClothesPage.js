import React from 'react';
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
import DataList from '../DataList';

import ClothesList from './ClothesList';

const clothesFormConfigs = [
  {
    name: 'name',
    label: 'Clothes Name',
    validation: {
      required: 'Name is Required',
    },
  },
  {
    label: 'Description',
    name: 'description',
  },
  {
    label: 'Type of Clothes',
    name: 'type',
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
  // return <ClothesList />;
  return (
    <DataList
      path="/clothes"
      paginationSelector={clothesPaginationSelector}
      getDataSelector={getClothesDetailSelector}
      fetchPaginationAction={getClothesList}
      updateAction={updateClothes}
      deleteAction={deleteClothes}
      createAction={createClothes}
      formConfigs={clothesFormConfigs}
    />
  );
}
