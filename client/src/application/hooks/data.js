import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClothesLocations } from '../redux/actions/clothesLocation';

export function useClothesLocation() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchClothesLocations());
  }, [dispatch]);

  return useSelector(state => state.clothesLocation);
}
