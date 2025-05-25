import closePopup from '../../utils/closePopup';
import { generateComponent } from '../../utils/componentGenerator';
import './style.scss';

const blackout = {
  tag: 'div',
  options: { className: 'top-blackout', id: 'top-blackout' },
  listeners: { click: closePopup },
};

const Blackout = generateComponent(blackout);

export default Blackout;
