import Classes from './style.module.scss'

const SummaryItem = ({ title, price }) => (
  <div className={Classes.addFinish}>
    <p>{title}</p>
    <span>+${price}</span>
  </div>
);

export default SummaryItem;
