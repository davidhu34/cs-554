import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClothesList } from '../../application/redux/actions';
import { clothesPaginationSelector, getClothesDetailSelector } from '../../application/redux/selectors';

function ClothesItem({ id }) {
  const { data, error, loading } = useSelector(getClothesDetailSelector(id));
  return <div key={id}>
    {data.name}
  </div>
}

export default function ClothesList() {
  const { idList, page, error, loading } = useSelector(clothesPaginationSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClothesList({ page: 0 }))
  }, [dispatch]);
  console.log(idList);
  return (
    <>{idList.map(id => <ClothesItem id={id} />)}</>
  );
}
