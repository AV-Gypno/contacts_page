import { waveAnimation } from '../animations/waveAnimation';
import commonStyles from './../common.module.scss';

import styles from './style.module.scss';

const CloseButton = () => {
  const button = document.createElement('button');
  button.classList.add(commonStyles['button'], styles['close-button']);

  button.addEventListener('click', function (e) {
    waveAnimation(this, e);

    document.querySelector('#group-aside')?.classList.remove('active');
    document.querySelector('#contact-aside')?.classList.remove('active');
    document.querySelector('#blackout')?.classList.remove('active');
  });

  return button;
};

export default CloseButton;
