import Classes from './style.module.scss';
import thankyou from '../../assets/images/icon-thank-you.svg';
import { FormattedMessage } from 'react-intl';

const FifthPage = () =>(
  <div className={Classes.thanks}>
    <img src={thankyou} alt="Subscription confirmed" />
    <h2><FormattedMessage id='title_finishing'/></h2>
    <p>
    <FormattedMessage id='paragraph_finishing'/>
    </p>
  </div>
);

export default FifthPage;