import { generateComponent } from '../../utils/componentGenerator';
import './style.scss';

const blackout = {
  tag: 'div',
  options: { className: 'blackout', id: 'blackout' },
  listeners: { click: closeAside },
};

function closeAside() {
  document.querySelector('#contact-aside')?.classList.remove('active');
  document.querySelector('#group-aside')?.classList.remove('active');
  document.querySelector('#blackout')?.classList.remove('active');
}

const Blackout = generateComponent(blackout);

export default Blackout;
