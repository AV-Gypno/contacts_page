import { generateComponent } from '../../../utils/componentGenerator';
import { waveAnimation } from '../animations/waveAnimation';
import commonStyles from './../common.module.scss';

import styles from './style.module.scss';

const getButtonStructure = (clickHandler: (e: MouseEvent) => void) => {
  return {
    tag: 'button',
    options: { className: `${commonStyles['button']} ${styles['add-group-button']}`, textContent: 'Добавить' },
    listeners: { click: clickHandler },
  };
};

const AddGroupButton = (propClickHandler: (e: MouseEvent) => void) => {
  const clickHandler = (e: MouseEvent) => {
    propClickHandler(e);

    waveAnimation(e.target as HTMLButtonElement, e);

    document.querySelector('#group-aside')?.classList.add('active');
    document.querySelector('#blackout')?.classList.add('active');
  };

  const AddGroupButton = generateComponent(getButtonStructure(clickHandler));

  return AddGroupButton;
};

export default AddGroupButton;
