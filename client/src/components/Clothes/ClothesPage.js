import React from 'react';
import {
  createClothes,
  deleteClothes,
  getClothesList,
  updateClothes,
} from '../../application/redux/actions';
import { clothesPaginationSelector, getClothesDetailSelector } from '../../application/redux/selectors';
import DataList from '../DataList';

import ClothesList from './ClothesList';

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
    />
  );
}
