import LocalStorage from '../../db/localStorage';
import type { IComponent } from '../../types/component';
import AddGroupButton from '../../ui/buttons/AddGroup';
import CloseButton from '../../ui/buttons/Close';
import SaveButton from '../../ui/buttons/Save';
import DeleteSVG from '../../ui/icons/delete';
import NameInput from '../../ui/inputs/Name';
import { generateComponent } from '../../utils/componentGenerator';
import forceUpdate from '../../utils/forceUpdate';

import './style.scss';

const getGroupsStructure = (): IComponent[] => {
  const groups = LocalStorage.getGroups();

  return groups.map((group: string) => ({
    tag: 'li',
    options: {
      className: 'group-li',
    },
    children: [
      {
        tag: 'p',
        options: {
          className: 'group-name',
          textContent: group,
        },
      },
      {
        tag: 'button',
        options: { className: 'group-button delete', id: `${group}` },
        listeners: { click: deleteClickHandler },
        children: [
          {
            tag: '',
            component: DeleteSVG('delete-icon'),
          },
        ],
      },
    ],
  }));
};

const getGroupListStructure = (isActive: boolean): IComponent => {
  return {
    tag: 'aside',
    options: { className: `aside ${isActive && 'active'}`, id: 'group-aside' },
    children: [
      {
        tag: 'div',
        options: {
          className: 'aside__head',
        },
        children: [
          { tag: 'h2', options: { className: 'aside__head_text', textContent: 'Группы контактов' } },
          { tag: '', component: CloseButton() },
        ],
      },

      {
        tag: 'ul',
        options: { className: 'group-list' },
        children: getGroupsStructure(),
      },

      {
        tag: 'div',
        options: { className: 'aside__footer' },
        children: [
          { tag: '', component: AddGroupButton(addClickHandler) },
          { tag: '', component: SaveButton(saveClickHandler) },
        ],
      },
    ],
  };
};

function addClickHandler() {
  const inputGroup = {
    tag: 'li',
    options: {
      className: 'group-li',
    },
    children: [
      {
        tag: '',
        component: NameInput('Введите название', 'group-input'),
      },
      { tag: 'span', options: { className: 'tooltip group', textContent: 'Поле является обязательным' } },
      {
        tag: 'button',
        options: { className: 'group-button delete' },
        listeners: { click: closeInputHandler },
        children: [
          {
            tag: '',
            component: DeleteSVG('delete-icon'),
          },
        ],
      },
    ],
  };

  const groupList = document.querySelector('.group-list');
  groupList?.append(generateComponent(inputGroup));
}

function closeInputHandler(e: MouseEvent) {
  const blockToRemove = (e.target as HTMLButtonElement).parentNode as HTMLElement;
  blockToRemove?.remove();

  forceUpdate(document.querySelector('#group-aside')!, GroupAside(true));
}

function saveClickHandler() {
  const group = (document.querySelector('#group-input') as HTMLInputElement).value;

  if (group.length) {
    LocalStorage.saveGroup(group);
    forceUpdate(document.querySelector('#group-aside')!, GroupAside(true));
  } else {
    document.querySelector('.tooltip.group')?.classList.add('mistake');
  }
}

const deleteClickHandler = (e: MouseEvent) => {
  const target = e.target as HTMLButtonElement;
  const groupName = target.id;

  LocalStorage.deleteGroup(groupName);
  forceUpdate(document.querySelector('#group-aside')!, GroupAside(true));
};

const GroupAside = (isActive: boolean = false): (() => HTMLElement) => {
  const structure = getGroupListStructure(isActive);

  return () => generateComponent(structure);
};

export default GroupAside(false);
