import type { IComponent } from '../../../types/component';
import closeAll from '../../../utils/closeAll';
import { generateComponent } from '../../../utils/componentGenerator';
import { waveAnimation } from '../animations/waveAnimation';
import commonStyles from './../common.module.scss';

import styles from './style.module.scss';

const button: IComponent = {
  tag: 'button',
  options: { className: `${commonStyles['button']} ${styles['close-button']}` },
  listeners: { click: clickHandler },
};

function clickHandler(e: MouseEvent) {
  waveAnimation(e.target as HTMLButtonElement, e);
  closeAll();
}

const CloseButton = () => {
  const CloseButton = generateComponent(button);

  return CloseButton;
};

export default CloseButton;
