import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import DataForm from './DataForm';

export default function DataCreate({
  formConfigs,
  createAction,
  fetchPaginationAction,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleFormSubmit(formData) {
    await dispatch(createAction(formData));
    dispatch(fetchPaginationAction({ page: 0 }));
    navigate(-1);
  }

  return <DataForm formConfigs={formConfigs} onSubmit={handleFormSubmit} submitText="Add" />;
}
