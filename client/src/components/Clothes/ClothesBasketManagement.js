import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { axiosGet } from '../../application/api/utils';
import { useClothesLocation } from '../../application/hooks/data';
import { updateBasketClothes } from '../../application/redux/actions/basket';
import { fetchClothesLocations } from '../../application/redux/actions/clothesLocation';
import DataModal from '../DataPage/DataModal';
import { userSelector } from '../../application/redux/selectors';

export default function ClothesBasketManagement() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [basketId, setBasketId] = useState('');

  const clothesIdList =
    new URLSearchParams(location.search).getAll('clothes') || '';
  const [baskets, setBaskets] = useState([]);

  const {
    data: clothesLocaiton,
    loading: clothesLocaitonLoading,
    error: clothesLocaitonError,
  } = useClothesLocation();

  const pendingBasketIdSet = new Set(baskets.map((b) => b._id));
  const clearableIdList = [];
  const operableIdList = [];
  for (const clothesId of clothesIdList) {
    if (!clothesLocaiton[clothesId]) {
      operableIdList.push(clothesId);
    } else if (pendingBasketIdSet.has(clothesLocaiton[clothesId])) {
      clearableIdList.push(clothesId);
      operableIdList.push(clothesId);
    }
  }
  const canClear = clearableIdList.length > 0;
  const canOperate = operableIdList.length === clothesIdList.length;

  const { _id: userId, groupId } = useSelector(userSelector);
  useEffect(() => {
    async function getPendingBaskets() {
      const baskets = await axiosGet('/baskets/pending', {
        params: { userId, groupId },
      });
      setBaskets(baskets);
      if (baskets.length > 0) setBasketId(baskets[0]._id);
    }
    if (userId && groupId) getPendingBaskets();
  }, [userId, groupId]);

  function handleSelectBasket(e) {
    setBasketId(e.target.value);
  }

  function handleClose() {
    navigate(-1);
  }

  async function handlePutClothesToBasket() {
    if (canOperate) {
      await dispatch(updateBasketClothes(basketId, operableIdList));
      await dispatch(fetchClothesLocations());
    }
    handleClose();
  }

  async function handleRemoveClothesFromBaskets() {
    if (canClear) {
      await Promise.all(
        clearableIdList.map((id) =>
          dispatch(updateBasketClothes(clothesLocaiton[id], [id], true))
        )
      );
      await dispatch(fetchClothesLocations());
      handleClose();
    }
  }

  return (
    <DataModal open onClose={handleClose}>
      {canClear && (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box>
            <Typography>
              Remove selected clothes from current pending baskets
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                handleRemoveClothesFromBaskets();
              }}
            >
              Remove from Basket(s)
            </Button>
          </Box>
        </Box>
      )}
      {canClear && canOperate && <Divider />}
      {canOperate ? (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography>
              move {operableIdList.length} piece of clothes into pending basket
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <FormControl>
                <InputLabel id="pending-basket-select-label">
                  Pending Baskets
                </InputLabel>
                <Select
                  labelId="pending-basket-select-label"
                  id="pending-basket-select"
                  value={basketId}
                  label="Pending Baskets"
                  onChange={handleSelectBasket}
                >
                  {baskets.map(({ _id, name }) => (
                    <MenuItem key={_id} value={_id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Button
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  handlePutClothesToBasket();
                }}
              >
                Move to Basket
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>Some selected clothes are still in task(s)</Box>
      )}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end' }}>
        <Button onClick={() => handleClose()} variant="outlined">
          Close
        </Button>
      </Box>
    </DataModal>
  );
}
