import LocalStorage from '../../db/localStorage';
import closeAll from '../../utils/closeAll';
import { generateComponent } from '../../utils/componentGenerator';
import forceUpdate from '../../utils/forceUpdate';
import openToast from '../../utils/openToast';
import Contacts from '../Contacts';
import GroupAside from './groupAside';
import { getContactAsideStructure } from './structures';

import './style.scss';

const handleMistake = (name: HTMLInputElement, phone: HTMLInputElement, ttName: HTMLElement, ttPhone: HTMLElement) => {
  if (!name.value) {
    name.classList.add('mistake');
    ttName?.classList.add('mistake');
  }

  if (name.value) {
    name.classList.remove('mistake');
    ttName?.classList.remove('mistake');
  }

  if (!phone.value) {
    phone.classList.add('mistake');
    ttPhone?.classList.add('mistake');
  }

  if (phone.value) {
    phone.classList.remove('mistake');
    ttPhone?.classList.remove('mistake');
  }
};

function clickHandler() {
  const name = document.querySelector('#name') as HTMLInputElement;
  const phone = document.querySelector('#phone') as HTMLInputElement;
  const group = document.querySelector('#group') as HTMLElement;
  const ttName = document.querySelector('.tooltip.name') as HTMLElement;
  const ttPhone = document.querySelector('.tooltip.phone') as HTMLElement;

  handleMistake(name, phone, ttName, ttPhone);

  const groupText = group.textContent?.toLowerCase() ?? '';
  const hasGroup = groupText.toLowerCase() !== 'Выберите группу'.toLowerCase();
  const groupName = hasGroup ? groupText : 'Bce';

  if (phone.value && name.value) {
    const contact = LocalStorage.createDTO(name.value, phone.value, groupName);
    if (groupName === 'Bce') LocalStorage.saveGroup(groupName);

    const message = LocalStorage.saveContact(contact);
    if (message) {
      phone.classList.add('mistake');
      ttPhone?.classList.add('mistake');
      ttPhone!.textContent = message;
    }

    if (!message) openToast('Контакт успешно создан');

    forceUpdate(document.querySelector('#contacts-list')!, Contacts);
    forceUpdate(document.querySelector('#group-aside')!, GroupAside(false));
    closeAll();

    name.value = '';
    phone.value = '';
  }
}

const ContactAside = () => {
  const ContactAside = generateComponent(getContactAsideStructure(clickHandler));

  return ContactAside;
};

export default ContactAside;
