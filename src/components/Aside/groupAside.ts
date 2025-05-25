import LocalStorage from '../../db/localStorage';
import closeAll from '../../utils/closeAll';
import { generateComponent } from '../../utils/componentGenerator';
import forceUpdate from '../../utils/forceUpdate';
import openPopup from '../../utils/openPopup';
import openToast from '../../utils/openToast';
import Contacts from '../Contacts';
import ContactAside from './contactAside';
import { getGroupListStructure, getInputGroup } from './structures';

import './style.scss';

const deleteClickHandler = (e: MouseEvent): void => {
  const target = e.target as HTMLButtonElement;
  const groupName = target.id;
  closeAll();

  openPopup(groupName);
};

function addClickHandler() {
  const groupList = document.querySelector('.group-list');
  const InputGroup = generateComponent(getInputGroup());

  groupList?.append(InputGroup);
}

function saveClickHandler() {
  const group = (document.querySelector('#group-input') as HTMLInputElement).value;

  if (group.length) {
    const message = LocalStorage.saveGroup(group);

    if (message) {
      document.querySelector('.tooltip.group')!.textContent = message;
      document.querySelector('.tooltip.group')!.classList.add('mistake');
      openToast('Группа с таким название уже существует', false);
    }

    if (!message) {
      forceUpdate(document.querySelector('#contact-aside')!, ContactAside);
      forceUpdate(document.querySelector('#group-aside')!, GroupAside(true));
      forceUpdate(document.querySelector('#contacts-list')!, Contacts);
      closeAll();
      openToast('Группа успешно создана');
    }
  } else {
    document.querySelector('.tooltip.group')?.classList.add('mistake');
  }
}

const GroupAside = (isActive: boolean = false): (() => HTMLElement) => {
  const structure = getGroupListStructure(isActive, deleteClickHandler, addClickHandler, saveClickHandler);

  return () => generateComponent(structure);
};

export default GroupAside;
