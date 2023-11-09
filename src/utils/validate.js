
export const validateBiodata = ( localFormData  , setErrors ) => {
    let isValid = true;
    const newErrors = {};

    // Validate localFormData instead of formData
    if (!localFormData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    // Ensure that localFormData.email is a string before calling match
    if (!localFormData.email || !localFormData.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }
    if (!localFormData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };