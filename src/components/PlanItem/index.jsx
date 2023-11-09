import Classes from './style.module.scss';

const PlanItemStep = ({img, title, price, selected, switchOff}) => (
  <div className={selected ? `${Classes.planCard} ${Classes.planClick}` : Classes.planCard}>
    <img src={img} alt={title} />
    <div className={Classes.title}>
      <h3>{title}</h3>
      <p>${price}</p>
      {switchOff && <p style={{ color: '#174a89' }}>2 months free</p>}
    </div>
  </div>
);

export default PlanItemStep;
