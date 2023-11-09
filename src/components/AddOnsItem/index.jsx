import { useDispatch } from 'react-redux';
import Classes from './style.module.scss';

const AddOnsItem = ({pack, onClickItem}) => {
  const dispatch = useDispatch();
  return (
    <label
      className={
        !pack.addon ? `${Classes.dflex} ${Classes.pack}` : `${Classes.dflex} ${Classes.pack} ${Classes.planClick}`
      }
      htmlFor="Online Service"
    >
      <div className={Classes.dflex}>
        <input
          className={Classes.checkMark}
          type="checkbox"
          name={pack.title}
          id={pack.title}
          checked={pack.addon}
          onChange={onClickItem}
        />
        <div className={Classes.title}>
          <h3>{pack.title}</h3>
          <p>{pack.text}</p>
        </div>
      </div>
      <span>{`Price: $${pack.price.monthly}/month or $${pack.price.yearly}/year`}</span>
    </label>
  );
};

export default AddOnsItem;