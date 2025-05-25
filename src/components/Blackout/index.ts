import closeAll from '../../utils/closeAll';
import { generateComponent } from '../../utils/componentGenerator';
import './style.scss';

const blackout = {
  tag: 'div',
  options: { className: 'blackout', id: 'blackout' },
  listeners: { click: closeAll },
};
const Blackout = () => {
  const Blackout = generateComponent(blackout);

  return Blackout;
};

export default Blackout;
