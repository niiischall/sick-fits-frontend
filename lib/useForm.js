import { useState } from 'react';

const useForm = (initialState = {}) => {
  const [inputs, setInputs] = useState(initialState);

  const handleInputChange = (event) => {
    let { name, value, type } = event.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = event.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs(initialState);
  };

  const clearForm = () => {
    const entries = Object.entries(inputs).map(([key, value]) => [key, '']);
    const inputsFromEnteries = Object.fromEntries(entries);
    setInputs(inputsFromEnteries);
  };

  return {
    inputs,
    resetForm,
    clearForm,
    handleInputChange,
  };
};

export default useForm;
