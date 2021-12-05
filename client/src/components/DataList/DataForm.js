import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function DataForm({
  formConfigs,
  onSubmit,
  defaultValues,
  submitText = 'Submit',
}) {
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

  return (
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
                          <option value={option.value}>{option.label}</option>
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
  );
}
