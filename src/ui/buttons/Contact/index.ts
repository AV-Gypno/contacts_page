import { waveAnimation } from '../animations/waveAnimation';
import commonStyles from './../common.module.scss';

import styles from './style.module.scss';

const ContactButton = () => {
  const button = document.createElement('button');
  button.classList.add(commonStyles['button'], styles['add-button']);
  button.textContent = 'Добавить контакт';

  button.addEventListener('click', function (e) {
    waveAnimation(this, e);
  });

  return button;
};

export default ContactButton;
