import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClothesLocations } from '../redux/actions/clothesLocation';

export function useClothesLocation(options = {}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (options.refresh) dispatch(fetchClothesLocations());
  }, [dispatch, options.refresh]);

  return useSelector((state) => state.clothesLocation);
}
