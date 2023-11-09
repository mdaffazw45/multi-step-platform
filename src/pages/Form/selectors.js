// selectors.js
import { createSelector } from 'reselect';
import { initialState } from '@pages/Form/reducer';

const selectFormState = (state) => state.form || initialState;

export const selectCurrentStep = createSelector(selectFormState, (state) => state.currentStep); 

// Selector to get the form data for all steps
export const selectFormData = (state) => state.form.formData;

// Selector to get form data for a specific step
export const selectStepData = (state, step) => state.form.formData[`step${step}`];

// Selector to get the form errors
export const selectFormErrors = (state) => state.form.formErrors;

// Selector to get form errors for a specific step
export const selectStepErrors = (state, step) => state.form.formErrors[`step${step}`];

// Selector to get the submission status
export const selectIsSubmissionSuccessful = (state) => state.form.isSubmissionSuccessful;

export const selectFormErrorsForCurrentStep = (state) => {
  const currentStep = state.form.currentStep;
  return state.form.formErrors[`step${currentStep}`] || {};
};

// Selector to get the form data for the current step
export const selectFormDataForCurrentStep = (state) => {
  const currentStep = state.form.currentStep;
  return state.form.formData[`step${currentStep}`] || {};
};

