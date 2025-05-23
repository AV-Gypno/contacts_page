import { waveAnimation } from '../animations/waveAnimation';
import commonStyles from './../common.module.scss';
import styles from './style.module.scss';

const MainButton = (text?: string) => {
  const button = document.createElement('button');
  button.classList.add(commonStyles['button'], styles['add-button']);

  if (text) button.textContent = text;

  button.addEventListener('click', function (e) {
    waveAnimation(this, e);
  });

  return button;
};

export default MainButton;
