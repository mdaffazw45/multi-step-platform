import PropTypes from 'prop-types';
import { useEffect , useState } from 'react';
import { useDispatch, connect , useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setCurrentStep , updateForm } from './actions';
import { selectCurrentStep } from './selectors';
import { FormattedMessage } from 'react-intl';
import SidebarStep from '@components/SidebarStep';
import Classes from './style.module.scss';
import FirstPage from '@pages/FirstPage';
import SecondPage from '@pages/SecondPage';
import ThirdPage from '@pages/ThirdPage';
import FifthPage from '@pages/FifthPage';
import FourthPage from '@pages/FourthPage';
import { validateBiodata } from '@utils/validate';
import { selectFormDataForCurrentStep } from './selectors';
const Form = ({ currentStep}) => {

  const [localFormData, setLocalFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  
  const formData = useSelector((state) => selectFormDataForCurrentStep(state, currentStep));
  const [selectedPlan, setSelectedPlan] = useState(formData.plan || null);
  const [isYearlyBilling, setIsYearlyBilling] = useState(formData.isYearlyBilling || false);

  const planData = useSelector((state) => state.form.formData.step2);
  const addOnsData = useSelector((state) => state.form.formData.step3)
  const [total, setTotal] = useState(0);
  
  const plansData = {
    Arcade: { monthly: 5, yearly: 90 },
    Advanced: { monthly: 12, yearly: 120 },
    Pro: { monthly: 15, yearly: 150 },
  };

  const [paks, setPaks] = useState(
    formData.addOns || [
      {
        title: 'Online service',
        text: 'Access to multiplayer games',
        price: {
          monthly: 1,
          yearly: 10,
        },
        addon: false,
      },
      {
        title: 'Larger storage',
        text: 'Extra 1TB of cloud save',
        price: {
          monthly: 2,
          yearly: 20,
        },
        addon: false,
      },
      {
        title: 'Customizable profile',
        text: 'Custom theme on your profile',
        price: {
          monthly: 2,
          yearly: 20,
        },
        addon: false,
    }
    ]
  );

  const onClickItem = (index) => {
    const newPaks = [...paks];
    newPaks[index] = { ...newPaks[index], addon: !newPaks[index].addon };
    setPaks(newPaks);
  };
  

  
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    dispatch(
      updateForm(currentStep, {
        ...formData,
        plan,
        isYearlyBilling,
        price: isYearlyBilling ? plansData[plan].yearly : plansData[plan].monthly,
      })
    );
  };

  const handleBillingCycleSwitch = () => {
    const newBillingCycle = !isYearlyBilling;
    setIsYearlyBilling(newBillingCycle);
    dispatch(
      updateForm(currentStep, {
        ...formData,
        plan: selectedPlan,
        isYearlyBilling: newBillingCycle,
        price: newBillingCycle ? plansData[selectedPlan].yearly : plansData[selectedPlan].monthly,
      })
    );
  };

  const getPlanPriceText = (plan) => {
    const price = isYearlyBilling ? `${plansData[plan].yearly}/year` : `${plansData[plan].monthly}/month`;
    const freeMonths = isYearlyBilling && plan === 'Pro' ? ' (2 months free)' : '';
    return `$${price} ${plan}${freeMonths}`;
  };


    const dispatch = useDispatch();

    const [Errors , setErrors] = useState('')
  
    const handleNextStep = () => {
      
      if (currentStep === 1) {
        console.log(currentStep , 'Current Step')
      if (validateBiodata(localFormData , setErrors)) {
        console.log(localFormData , 'Local Form Data')
        dispatch(updateForm(1, localFormData)); // Update the form data in Redux
        dispatch(setCurrentStep(2)); // Move to the next step in Redux
        if (onSubmit) onSubmit(localFormData); // If there's a submit handler passed down, call it
      }
    } else if (currentStep === 2) {
      
     // Update the form data in Redux
      dispatch(setCurrentStep(currentStep+1))
      if (onSubmit) onSubmit(localFormData); // If there's a submit handler passed down, call it
    } else if (currentStep === 3) {
      dispatch(updateForm(currentStep, { addOns: paks }));
      dispatch(setCurrentStep(currentStep+1))
    } else if (currentStep === 4) {
      dispatch(setCurrentStep(currentStep+1))
    }
    };  
  
    const handlePreviousStep = () => {
      const previousStep = currentStep > 1 ? currentStep - 1 : currentStep;
      dispatch(setCurrentStep(previousStep))
    };
  
    useEffect(() => {
      // If there is any initialization logic for the form or side effects
    }, []);

    console.log(currentStep ,'currentStep')
    console.log(setCurrentStep, 'Set Current Step')
  return (
    <main>
      <div className={Classes.Container}>
        <div className={Classes.SidebarSteps}>
          {/* Adjust the `active` prop to correctly reflect the currentStep */}
          <SidebarStep step={1} title={<FormattedMessage id="desc_step_form_1" />} active={currentStep === 1} />
          <SidebarStep step={2} title={<FormattedMessage id="desc_step_form_2" />} active={currentStep === 2} />
          <SidebarStep step={3} title={<FormattedMessage id="desc_step_form_3" />} active={currentStep === 3} />
          <SidebarStep step={4} title={<FormattedMessage id="desc_step_form_4" />} active={currentStep === 4} />
          
        </div>
        <div className={Classes.content}>
          {/* Conditional rendering based on the currentStep */}
          {currentStep === 1 && <FirstPage setLocalFormData={setLocalFormData} localFormData={localFormData}/>}
          {currentStep === 2 && <SecondPage setLocalFormData={setLocalFormData} localFormData={localFormData} handleSelectPlan={handleSelectPlan} handleBillingCycleSwitch={handleBillingCycleSwitch} getPlanPriceText={getPlanPriceText} formData={formData} plansData={plansData}  selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} isYearlyBilling={isYearlyBilling }  setIsYearlyBilling={setIsYearlyBilling}/>}
          {currentStep === 3 && <ThirdPage setLocalFormData={setLocalFormData} localFormData={localFormData} paks={paks} setPaks={setPaks} onClickItem={onClickItem} />}
          {currentStep === 4 && <FourthPage planData={planData} addOnsData={addOnsData} total={total} setTotal={setTotal}  />}
          {currentStep === 5 && <FifthPage />}
          {/* ... add additional steps as needed */}
          <div className={Classes.navigation}>
            {/* Show "Go Back" if on steps greater than 1 */}
            {currentStep > 1 && (
              <button className={Classes.btn1} onClick={handlePreviousStep}>
                Go Back
              </button>
            )}
            {/* Change the button text to "Confirm" on the last step */}
            <button type="button" className={Classes.btn2} onClick={handleNextStep}>
              {currentStep === 4 ? 'Confirm' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

Form.propTypes = {
    currentStep: PropTypes.number.isRequired
};
  
  const mapStateToProps = createStructuredSelector({
    currentStep: selectCurrentStep,
  });
  
  

export default connect(mapStateToProps)(Form);
