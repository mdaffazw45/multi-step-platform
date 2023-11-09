import React , { useState}from 'react'
import { useDispatch } from 'react-redux';
import { setCurrentStep, updateForm } from '@pages/Form/actions';
import { selectFormDataForCurrentStep } from '@pages/Form/selectors';
import Classes from './style.module.scss';
import { FormattedMessage } from 'react-intl';


const FirstPage = ({ onSubmit, currentStep , setLocalFormData , localFormData }) => {

const dispatch = useDispatch();

// const [localFormData, setLocalFormData] = useState({
//   name: '',
//   email: '',
//   phone: '',
// });

const [errors, setErrors] = useState({});

  // console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validate = () => {
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

  const handleNext = () => {
    if  (validate()) {
      dispatch(updateForm(1, localFormData)); // Update the form data in Redux
      dispatch(setCurrentStep(2)); // Move to the next step in Redux
      if (onSubmit) onSubmit(localFormData); // If there's a submit handler passed down, call it
    }
  };


  return (
    <div className={Classes.info}>
      <h2><FormattedMessage id='header_form_step_1'/></h2>
      <p><FormattedMessage id='desc_form_step_1'/></p>
      <form className={Classes.form} autoComplete="on">
        <div className={Classes.fields}>
          <div className={Classes.dflex}>
            <label htmlFor="name">Name</label>
          </div>
          <input
            name="name"
            type="text"
            placeholder="e.g. Stephe king"
            value={localFormData.name}
            onChange={handleChange}
            className={errors.name ? Classes.errorField : ''}
          />
          {errors.name && <p className={Classes.error}>{errors.name}</p>}
        </div>
        <div className={Classes.fields}>
          <div className={Classes.dflex}>
            <label>Email Address</label>
          </div>
          <input
            name="email"
            type="text"
            inputMode="email"
            placeholder="e.g. Stepheking@lorem.com"
            value={localFormData.email}
            onChange={handleChange}
            className={errors.email ? Classes.errorField : ''}
          />
          {errors.email && <p className={Classes.error}>{errors.email}</p>}
        </div>
        <div className={Classes.fields}>
          <div className={Classes.dflex}>
            <label>Phone Number</label>
          </div>
          <input
            name="phone"
            type="text"
            placeholder="e.g. +1 234 567 890"
            inputMode="tel"
            value={localFormData.phone}
            onChange={handleChange}
            className={errors.phone ? Classes.errorField : ''}
          />
          {errors.phone && <p className={Classes.error}>{errors.phone}</p>}
        </div>
        {/* <div className={currentStep === 1 ? `${Classes.navigation} ${Classes.btnRight}` : Classes.navigation}>
          <button onClick={handleNext} type="button" className={Classes.btn2}>
            Next Step
          </button>
        </div> */}
        {/* <button type="button" onClick={handleNext} className={Classes.btnNext}>
          Next Step
        </button> */}

      </form>
    </div>
  )
}



export default FirstPage
