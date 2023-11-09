import {
  FORM_SUBMISSION_FAILED,
  FORM_SUBMISSION_SUCCESS,
  FORM_VALIDATION_FAILED,
  LOAD_PREVIOUS_STEP_DATA,
  SET_CURRENT_STEP,
  SUBMIT_FORM,
  UPDATE_FORM,
  VALIDATE_FORM,
} from './constants';

// Action to set the current step in the form sequence
export const setCurrentStep = (step) => ({
  type: SET_CURRENT_STEP,
  payload: step,
});

// Action to update the form data for the current step
export const updateForm = (step, data) => ({
  type: UPDATE_FORM,
  payload: { step, data },
});

// Action to trigger form validation
export const validateForm = (step, data) => ({
  type: VALIDATE_FORM,
  payload: { step, data },
});

// Action to set form errors after validation
export const formValidationFailed = (step, errors) => ({
  type: FORM_VALIDATION_FAILED,
  payload: { step, errors },
});

// Action to submit the form
export const submitForm = () => ({
  type: SUBMIT_FORM,
});

// Action to handle successful form submission
export const formSubmissionSuccess = () => ({
  type: FORM_SUBMISSION_SUCCESS,
});

// Action to handle failed form submission
export const formSubmissionFailed = (error) => ({
  type: FORM_SUBMISSION_FAILED,
  payload: error,
});

// Action to load data from a previous step
export const loadPreviousStepData = (step) => ({
  type: LOAD_PREVIOUS_STEP_DATA,
  payload: step,
});
