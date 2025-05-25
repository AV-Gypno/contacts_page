import type { IComponent } from '../../../types/component';
import closePopup from '../../../utils/closePopup';
import { generateComponent } from '../../../utils/componentGenerator';
import { waveAnimation } from '../animations/waveAnimation';
import commonStyles from './../common.module.scss';

import styles from './style.module.scss';

const CancelButton = () => {
  const clickHandler = (e: MouseEvent) => {
    waveAnimation(e.target as HTMLButtonElement, e);
    closePopup();
  };

  const button: IComponent = {
    tag: 'button',
    options: { className: `${commonStyles['button']} ${styles['cancel-button']}`, textContent: 'Отмена' },
    listeners: { click: clickHandler },
  };

  const AddGroupButton = generateComponent(button);

  return AddGroupButton;
};

export default CancelButton;
