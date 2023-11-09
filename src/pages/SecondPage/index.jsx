import { useDispatch, useSelector } from 'react-redux';
import Classes from './style.module.scss';
import { FormattedMessage } from 'react-intl';
import Arcade from '../../assets/images/icon-arcade.svg';
import Advanced from '../../assets/images/icon-advanced.svg';
import { selectFormDataForCurrentStep } from '@pages/Form/selectors';
import Pro from '../../assets/images/icon-pro.svg';
import { useState , useEffect } from 'react';
import PlanItemStep from '@components/PlanItem';



const SecondPage = ({ handleNextStep, handlePreviousStep, currentStep , setLocalFormData , localFormData  , handleSelectPlan , handleBillingCycleSwitch , getPlanPriceText , formData , plansData , selectedPlan , isYearlyBilling , setSelectedPlan , setIsYearlyBilling }) => {
  const dispatch = useDispatch();


  useEffect(() => {
    if (formData) {
      setSelectedPlan(formData.plan || 'Arcade');
      setIsYearlyBilling(formData.isYearlyBilling || false);
    }
  }, [formData]);

  // const handleSelectPlan = (plan) => {
  //   setSelectedPlan(plan);
  //   dispatch(
  //     updateForm(currentStep, {
  //       ...formData,
  //       plan,
  //       isYearlyBilling,
  //       price: isYearlyBilling ? plansData[plan].yearly : plansData[plan].monthly,
  //     })
  //   );
  // };

  // const handleBillingCycleSwitch = () => {
  //   const newBillingCycle = !isYearlyBilling;
  //   setIsYearlyBilling(newBillingCycle);
  //   dispatch(
  //     updateForm(currentStep, {
  //       ...formData,
  //       plan: selectedPlan,
  //       isYearlyBilling: newBillingCycle,
  //       price: newBillingCycle ? plansData[selectedPlan].yearly : plansData[selectedPlan].monthly,
  //     })
  //   );
  // };

  // const getPlanPriceText = (plan) => {
  //   const price = isYearlyBilling ? `${plansData[plan].yearly}/year` : `${plansData[plan].monthly}/month`;
  //   const freeMonths = isYearlyBilling && plan === 'Pro' ? ' (2 months free)' : '';
  //   return `$${price} ${plan}${freeMonths}`;
  // };

  return (
    <div className={Classes.planInfo}>
      <h2>Select your plan</h2>
      <p>You have the option of monthly or yearly billing.</p>
      <div className={Classes.plansCards}>
      {Object.entries(plansData).map(([key, value]) => (
          <div key={key} onClick={() => handleSelectPlan(key)}>
            <PlanItemStep
              img={key === 'Arcade' ? Arcade : key === 'Advanced' ? Advanced : Pro}
              title={key}
              price={getPlanPriceText(key)}
              selected={selectedPlan === key}
              switchOff={isYearlyBilling}
            />
          </div>
        ))}
      </div>
      <label htmlFor="plan" className={Classes.switch}>
        {/* Corrected the className logic */}
        <span className={!isYearlyBilling ? Classes.switOn : ''}>Monthly</span>
        <input type="checkbox" name="plan" id="plan" checked={isYearlyBilling} onChange={handleBillingCycleSwitch} />
        <span className={isYearlyBilling ? Classes.switOn : ''}>Yearly</span>
      </label>
      <div className={currentStep === 1 ? `${Classes.navigation} ${Classes.btnRight}` : Classes.navigation}>
        {currentStep !== 1 && (
          <button onClick={handlePreviousStep} className={Classes.btn1}>
            Go Back
          </button>
        )}
        {currentStep < 4 && (
          <button onClick={handleNextStep} type="button" className={Classes.btn2}>
            Next Step
          </button>
        )}
      </div>
    </div>
  );
}

export default SecondPage;
