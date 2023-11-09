import AddOnsItem from '@components/AddOnsItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Classes from './style.module.scss';
import { updateForm } from '@pages/Form/actions';
import { selectFormDataForCurrentStep } from '@pages/Form/selectors';

const ThirdPage = ({ handleNextStep, handlePreviousStep, currentStep , setLocalFormData , localFormData , paks , setPaks , onClickItem }) => {
const formData = useSelector((state) => selectFormDataForCurrentStep(state));
  const dispatch = useDispatch();

//   const [paks, setPaks] = useState(
//     formData.addOns || [
//       {
//         title: 'Online service',
//         text: 'Access to multiplayer games',
//         price: {
//           monthly: 1,
//           yearly: 10,
//         },
//         addon: false,
//       },
//       {
//         title: 'Larger storage',
//         text: 'Extra 1TB of cloud save',
//         price: {
//           monthly: 2,
//           yearly: 20,
//         },
//         addon: false,
//       },
//       {
//         title: 'Customizable profile',
//         text: 'Custom theme on your profile',
//         price: {
//           monthly: 2,
//           yearly: 20,
//         },
//         addon: false,
//     }
//     ]
//   );

  useEffect(() => () => {
      dispatch(updateForm(currentStep, { addOns: paks }));
    }, [paks, dispatch]);

//   const onClickItem = (index) => {
//     const newPaks = [...paks];
//     newPaks[index] = { ...newPaks[index], addon: !newPaks[index].addon };
//     setPaks(newPaks);
//   };

//   // Function to handle the next step navigation
//   const onNextStep = () => {
//     dispatch(updateForm(currentStep, { addOns: paks }));
//     handleNextStep();
//   };

//   // Function to handle the previous step navigation
//   const onPreviousStep = () => {
//     handlePreviousStep();
//   };

  return (
    <div className={Classes.addonsInfo}>
      <h2>Pick add-ons</h2>
      <p>Add-ons help enhance your gaming experience.</p>
      <div className={Classes.packs}>
      {paks.map((pack, index) => (
          <AddOnsItem key={index} pack={pack} onClickItem={() => onClickItem(index)} />
        ))}
      </div>
      {/* <div className={Classes.navigation}>
        {currentStep !== 1 && (
          <button onClick={onPreviousStep} className={Classes.btn1}>
            Go Back
          </button>
        )}
        {currentStep < 4 && (
          <button onClick={onNextStep} type="button" className={Classes.btn2}>
            Next Step
          </button>
        )}
      </div> */}
    </div>
  );
};

export default ThirdPage;