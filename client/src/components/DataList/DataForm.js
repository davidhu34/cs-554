import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DataForm({
  title,
  description,
  formConfigs,
  onSubmit,
  onCancel,
  defaultValues,
  submitText = 'Submit',
}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [reset, defaultValues]);

  function handleCancel() {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  }

  return (
    <Modal
      open
      onClose={handleCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {title && (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        )}
        {description && (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {formConfigs.map(
            ({
              name,
              type = 'text',
              label = name,
              validation = {},
              options = [],
              defaultValue,
            }) => {
              const error = errors[name];
              console.log(error);
              switch (type) {
                case 'select':
                  return (
                    <div>
                      <select name={name} defaultValue={defaultValue}>
                        {options.map((option) => {
                          if (typeof option === 'string') {
                            return <option value={option}>{option}</option>;
                          }
                          if (typeof option === 'object') {
                            return (
                              <option value={option.value}>
                                {option.label}
                              </option>
                            );
                          }
                          return option;
                        })}
                      </select>
                      {error?.message && <div>{error.message}</div>}
                    </div>
                  );
                case 'text':
                case 'number':
                default:
                  return (
                    <div>
                      <label>{label}</label>
                      <input
                        name={name}
                        defaultValue={defaultValue}
                        type={type}
                        {...register(name, validation)}
                      />
                      {error?.message && <div>{error.message}</div>}
                    </div>
                  );
              }
            }
          )}
          <div>
            <input type="submit" value={submitText} />
          </div>
        </form>
      </Box>
    </Modal>
  );
}
