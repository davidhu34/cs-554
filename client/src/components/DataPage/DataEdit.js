import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import DataForm from './DataForm';

export default function DataEdit({
  formConfigs,
  getDataSelector,
  updateAction,
  title,
  description,
}) {
  const { id } = useParams();
  const { data, error, loading } = useSelector(getDataSelector(id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleFormSubmit(formData) {
    try {
      await dispatch(updateAction(id, formData));
      navigate(-1);
    } catch(error) {
      console.log('error editing data:', error);
    }
  }

  return (
    <DataForm
      formConfigs={formConfigs}
      onSubmit={handleFormSubmit}
      defaultValues={data}
      submitText="Save"
      title={title}
      description={description}
      error={error}
      loading={loading}
      disabled={!!error}
    />
  );
}
