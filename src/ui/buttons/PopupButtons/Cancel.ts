import { generateComponent } from '../../../utils/componentGenerator';
import { waveAnimation } from '../animations/waveAnimation';
import commonStyles from './../common.module.scss';

import styles from './style.module.scss';

const CancelButton = () => {
  const button = {
    tag: 'button',
    options: { className: `${commonStyles['button']} ${styles['cancel-button']}`, textContent: 'Отмена' },
  };

  const clickHandler = (e: MouseEvent) => {
    waveAnimation(e.target as HTMLButtonElement, e);

    document.querySelector('#popup')?.classList.remove('active');
    document.querySelector('#top-blackout')?.classList.remove('active');
    document.querySelector('#blackout')?.classList.remove('active');
  };

  const AddGroupButton = generateComponent(button);

  AddGroupButton.addEventListener('click', clickHandler);

  return AddGroupButton;
};

export default CancelButton;
