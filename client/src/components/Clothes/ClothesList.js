import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClothesList } from '../../application/redux/actions';
import {
  clothesPaginationSelector,
  getClothesDetailSelector,
} from '../../application/redux/selectors';

function ClothesItem({ id }) {
  const { data, error, loading } = useSelector(getClothesDetailSelector(id));
  return <div key={id}>{data.name}</div>;
}

export default function ClothesList() {
  const { idList, page, count, total = 0, error, loading } = useSelector(clothesPaginationSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClothesList({ page: 0 }));
  }, [dispatch]);

  return (
    <>
      <div>
        {idList.map((id) => (
          <ClothesItem key={id} id={id} />
        ))}
      </div>
      <div>count: {count}</div>
      <div>total: {total}</div>
      <div>
        {new Array(Math.ceil(total / (count || 1))).fill(0).map((_, i) => {
          return (
            <button
              key={`clothes-paginate-${i}`}
              onClick={() => {
                dispatch(getClothesList({ page: i }));
              }}
            >
              {i + 1}
              {page === i && <>*</>}
            </button>
          );
        })}
      </div>
    </>
  );
}
