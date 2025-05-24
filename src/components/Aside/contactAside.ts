import LocalStorage from '../../db/localStorage';
import type { IComponent } from '../../types/component';
import CloseButton from '../../ui/buttons/Close';
import SaveButton from '../../ui/buttons/Save';
import NameInput from '../../ui/inputs/Name';
import PhoneInput from '../../ui/inputs/Phone';
import Select from '../../ui/inputs/Select';
import { generateComponent } from '../../utils/componentGenerator';
import forceUpdate from '../../utils/forceUpdate';
import Contacts from '../Contacts';

import './style.scss';

const contactAside: IComponent = {
  tag: 'aside',
  options: { className: 'aside', id: 'contact-aside' },
  children: [
    {
      tag: 'div',
      options: {
        className: 'aside__head',
      },
      children: [
        { tag: 'h2', options: { className: 'aside__head_text', textContent: 'Добавление контакта' } },
        { tag: '', component: CloseButton() },
      ],
    },

    {
      tag: 'form',
      options: { className: 'aside__inputs' },
      children: [
        {
          tag: 'div',
          options: { className: 'input-block' },
          children: [
            {
              tag: '',
              component: NameInput(),
            },
            { tag: 'span', options: { className: 'tooltip name', textContent: 'Поле является обязательным' } },
          ],
        },
        {
          tag: 'div',
          options: { className: 'input-block' },
          children: [
            { tag: '', component: PhoneInput() },
            { tag: 'span', options: { className: 'tooltip phone', textContent: 'Поле является обязательным' } },
          ],
        },
        {
          tag: '',
          component: Select(),
        },
      ],
    },

    { tag: 'div', options: { className: 'aside__footer' }, children: [{ tag: '', component: SaveButton(clickHandler) }] },
  ],
};

const createDTO = (name: string, phone: string, group?: string) => {
  return {
    id: phone,
    phone: phone,
    name: name,
    group: group,
  };
};

function clickHandler() {
  const name = document.querySelector('#name') as HTMLInputElement;
  const phone = document.querySelector('#phone') as HTMLInputElement;
  const group = document.querySelector('#group') as HTMLElement;
  const ttName = document.querySelector('.tooltip.name');
  const ttPhone = document.querySelector('.tooltip.phone');

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

  const groupName = group.textContent ? group.textContent : 'all';
  if (phone.value && name.value) {
    const contact = createDTO(name.value, phone.value, groupName);

    const message = LocalStorage.saveContact(contact);
    if (message) {
      phone.classList.add('mistake');
      ttPhone?.classList.add('mistake');
      ttPhone!.textContent = message;
    }
    forceUpdate(document.querySelector('#contacts-list')!, Contacts);

    name.value = '';
    phone.value = '';
  }
}

const ContactAside = generateComponent(contactAside);

export default ContactAside;
