import { generateComponent } from '../../../utils/componentGenerator';
import { waveAnimation } from '../animations/waveAnimation';
import commonStyles from './../common.module.scss';

import styles from './style.module.scss';

const button = {
  tag: 'button',
  options: { className: `${commonStyles['button']} ${styles['add-button']}`, textContent: 'Добавить контакт' },
  listeners: { click: clickHandler },
};

function clickHandler(e: MouseEvent) {
  waveAnimation(e.target as HTMLButtonElement, e);

  document.querySelector('#contact-aside')?.classList.add('active');
  document.querySelector('#blackout')?.classList.add('active');
}

const ContactButton = generateComponent(button);

export default ContactButton;
