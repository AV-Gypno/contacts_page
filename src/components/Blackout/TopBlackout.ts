import closeAll from '../../utils/closeAll';
import { generateComponent } from '../../utils/componentGenerator';
import './style.scss';

const blackout = {
  tag: 'div',
  options: { className: 'top-blackout', id: 'top-blackout' },
  listeners: { click: closeAll },
};

const TopBlackout = () => {
  const Blackout = generateComponent(blackout);

  return Blackout;
};

export default TopBlackout;
