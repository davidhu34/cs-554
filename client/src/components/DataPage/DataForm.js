import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import DataModal from './DataModal';

import { Controller } from 'react-hook-form';

export default function DataForm({
  title,
  description,
  formConfigs,
  onSubmit,
  onCancel,
  defaultValues = {},
  submitText = 'Submit',
  error,
  loading,
  disabled,
}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  function handleCancel() {
    navigate(-1);
  }

  return (
    <DataModal
      open
      title={title}
      error={error || disabled || ''}
      loading={loading}
      description={description}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {formConfigs.map(
          ({
            name,
            type = 'text',
            label = name,
            validation = {},
            options = [],
          }) => {
            const error = errors[name];
            switch (type) {
              case 'select':
                const labelId = `${name}-label`;
                const defaultValue = defaultValues[name] || '';
                return (
                  <Box sx={{ margin: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id={labelId}>{label}</InputLabel>
                      <Controller
                        render={() => (
                          <Select
                            labelId={labelId}
                            label={label}
                            defaultValue={defaultValue}
                          >
                            {options.map((option) => {
                              if (typeof option === 'string') {
                                return (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                );
                              }
                              if (typeof option === 'object') {
                                return (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                );
                              }
                              return option;
                            })}
                          </Select>
                        )}
                        name={name}
                        control={control}
                        defaultValue={defaultValue}
                      />
                    </FormControl>
                  </Box>
                );
              case 'text':
              case 'number':
              default:
                return (
                  <Box sx={{ margin: 2 }}>
                    <TextField
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                      label={label}
                      id={`${name}-input`}
                      type={type}
                      inputProps={{ ...register(name, validation) }}
                    />
                  </Box>
                );
            }
          }
        )}
        <Box sx={{ margin: 2, display: 'flex', gap: 2, justifyContent: 'end' }}>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || disabled}
          >
            {submitText}
          </Button>
        </Box>
      </form>
    </DataModal>
  );
}
