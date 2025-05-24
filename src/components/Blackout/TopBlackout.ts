import closeAll from '../../utils/closePopup';
import { generateComponent } from '../../utils/componentGenerator';
import './style.scss';

const blackout = {
  tag: 'div',
  options: { className: 'top-blackout', id: 'top-blackout' },
  listeners: { click: closeAll },
};

const Blackout = generateComponent(blackout);

export default Blackout;
