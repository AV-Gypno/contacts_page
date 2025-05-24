import { generateComponent } from '../../../utils/componentGenerator';
import { waveAnimation } from '../animations/waveAnimation';
import commonStyles from './../common.module.scss';

import styles from './style.module.scss';

const button = {
  tag: 'button',
  options: { className: `${commonStyles['button']} ${styles['add-button']}`, textContent: 'Группы' },
  listeners: { click: clickHandler },
};

function clickHandler(e: MouseEvent) {
  waveAnimation(e.target as HTMLButtonElement, e);

  document.querySelector('#group-aside')?.classList.add('active');
  document.querySelector('#blackout')?.classList.add('active');
}

const GroupButton = generateComponent(button);

export default GroupButton;
