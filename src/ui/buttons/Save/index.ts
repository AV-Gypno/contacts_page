import { generateComponent } from '../../../utils/componentGenerator';
import { waveAnimation } from '../animations/waveAnimation';
import commonStyles from './../common.module.scss';

import styles from './style.module.scss';

const SaveButton = (clickSaveHandler: (e: MouseEvent) => void) => {
  const button = {
    tag: 'button',
    options: { className: `${commonStyles['button']} ${styles['add-button']}`, textContent: 'Сохранить' },
  };

  const Button = generateComponent(button);
  Button.addEventListener('click', (e: MouseEvent) => {
    waveAnimation(e.target as HTMLButtonElement, e);
    clickSaveHandler(e);
  });

  return Button;
};

export default SaveButton;
