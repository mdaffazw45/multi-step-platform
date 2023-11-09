import { useDispatch, useSelector } from 'react-redux';
import SummaryItem from '@components/SummaryItem';
import Classes from './style.module.scss';
import { updateForm } from '@pages/Form/actions';
import { useEffect, useState } from 'react';
import { selectFormDataForCurrentStep } from '@pages/Form/selectors';
import { FormattedMessage } from 'react-intl';

const FourthPage = ({ handleNextStep, handlePreviousStep, currentStep , planData , addOnsData , total , setTotal }) => {
  const dispatch = useDispatch();
//   const planData = useSelector((state) => state.form.formData.step2);
//   const addOnsData = useSelector((state) => state.form.formData.step3);
//   const [total, setTotal] = useState(0);

  console.log(planData)

  useEffect(() => {
    let newTotal = planData?.price || 0; // Directly use the price for the plan
  
    // Calculate the total price for add-ons
    addOnsData?.addOns?.forEach((addOn) => {
      if (addOn.addon) {
        // Check whether it's yearly or monthly billing and add the corresponding price
        newTotal += planData.isYearlyBilling ? addOn.price.yearly : addOn.price.monthly;
      }
    });
    console.log(newTotal , 'Total New Semua')
    setTotal(newTotal);
  }, [planData, addOnsData]);

  const onConfirm = () => {
    // Make sure to gather all the data you want to persist
    const confirmationData = {
      ...planData,
      ...addOnsData,
      total: total
    };
    dispatch(updateForm(currentStep, confirmationData));
    handleNextStep();
  };

  console.log(planData, "test")

  return (
    <div className={Classes.Finish}>
      <h2><FormattedMessage id='fourth_title'/></h2>
      <p>Double-check everything looks OK before confirming.</p>
      <div className={Classes.payout}>
        {/* Display the selected plan and price */}
        <div className={Classes.title}>
          <h3>{planData?.plan} ({planData?.isYearlyBilling ? 'Yearly' : 'Monthly'})</h3>
          <span>${total}</span>
        </div>
        {/* Display the selected add-ons and their prices */}
        {addOnsData?.addOns?.map((addOn, index) => addOn.addon && (
          <SummaryItem
          key={index}
          title={addOn.title}
          price={planData?.isYearlyBilling ? `$${addOn.price.yearly}` : `$${addOn.price.monthly}`}
          billingCycle={planData?.isYearlyBilling ? 'Yearly' : 'Monthly'}
          />
        ))}
      </div>
      {/* Display the total price */}
      <div className={Classes.total}>
        <p>Total</p>
        <span>+${total}</span>
      </div>
      <div className={Classes.navigation}>
        {/* Navigation buttons */}
        {/* {currentStep !== 1 && (
          <button onClick={handlePreviousStep} className={Classes.btn1}>
            Go Back
          </button>
        )}
        {currentStep === 4 && (
          <button onClick={onConfirm} type="button" className={Classes.btn2}>
            Confirm
          </button>
        )} */}
      </div>
    </div>
  );
};

export default FourthPage;