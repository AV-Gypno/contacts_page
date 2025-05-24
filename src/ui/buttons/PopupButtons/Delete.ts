import ContactAside from '../../../components/Aside/contactAside';
import GroupAside from '../../../components/Aside/groupAside';
import Contacts from '../../../components/Contacts';
import LocalStorage from '../../../db/localStorage';
import closePopup from '../../../utils/closePopup';
import { generateComponent } from '../../../utils/componentGenerator';
import forceUpdate from '../../../utils/forceUpdate';
import { waveAnimation } from '../animations/waveAnimation';
import commonStyles from './../common.module.scss';

import styles from './style.module.scss';

const DeleteButton = (group: string) => {
  const button = {
    tag: 'button',
    options: { className: `${commonStyles['button']} ${styles['delete-button']}`, textContent: 'Да, удалить' },
  };

  const Button = generateComponent(button);
  Button.addEventListener('click', (e: MouseEvent) => {
    waveAnimation(e.target as HTMLButtonElement, e);
    LocalStorage.deleteGroup(group);

    forceUpdate(document.querySelector('#contacts-list')!, Contacts);
    forceUpdate(document.querySelector('#group-aside')!, GroupAside(true));
    forceUpdate(document.querySelector('#contact-aside')!, ContactAside);

    closePopup();
  });

  return Button;
};

export default DeleteButton;
