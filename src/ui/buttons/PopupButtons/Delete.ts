import ContactAside from '../../../components/Aside/contactAside';
import GroupAside from '../../../components/Aside/groupAside';
import Contacts from '../../../components/Contacts';
import LocalStorage from '../../../db/localStorage';
import closeAll from '../../../utils/closeAll';
import { generateComponent } from '../../../utils/componentGenerator';
import forceUpdate from '../../../utils/forceUpdate';
import openToast from '../../../utils/openToast';
import { waveAnimation } from '../animations/waveAnimation';
import commonStyles from './../common.module.scss';

import styles from './style.module.scss';

const DeleteButton = (group: string) => {
  const button = {
    tag: 'button',
    options: { className: `${commonStyles['button']} ${styles['delete-button']}`, textContent: 'Да, удалить' },
    listeners: { click: clickHandler },
  };

  function clickHandler(e: MouseEvent): void {
    waveAnimation(e.target as HTMLButtonElement, e);
    LocalStorage.deleteGroup(group);
    openToast('Группа успешно удалена');
    forceUpdate(document.querySelector('#contacts-list')!, Contacts);
    forceUpdate(document.querySelector('#group-aside')!, GroupAside(true));
    forceUpdate(document.querySelector('#contact-aside')!, ContactAside);

    closeAll();
  }

  const Button = generateComponent(button);

  return Button;
};

export default DeleteButton;
