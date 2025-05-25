import LocalStorage from '../../db/localStorage';
import type { IComponent } from '../../types/component';
import AddGroupButton from '../../ui/buttons/AddGroup';
import CloseButton from '../../ui/buttons/Close';
import SaveButton from '../../ui/buttons/Save';
import DeleteSVG from '../../ui/icons/delete';
import NameInput from '../../ui/inputs/Name';
import PhoneInput from '../../ui/inputs/Phone';
import Select from '../../ui/inputs/Select';
import forceUpdate from '../../utils/forceUpdate';
import GroupAside from './groupAside';

const getContactAsideStructure = (saveHandler: (e: MouseEvent) => void): IComponent => ({
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

    { tag: 'div', options: { className: 'aside__footer' }, children: [{ tag: '', component: SaveButton(saveHandler) }] },
  ],
});

const getGroupsStructure = (deleteClickHandler: (e: MouseEvent) => void): IComponent[] => {
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

const getGroupListStructure = (
  isActive: boolean,
  deleteClickHandler: (e: MouseEvent) => void,
  addClickHandler: () => void,
  saveClickHandler: () => void
): IComponent => ({
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
      children: getGroupsStructure(deleteClickHandler),
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
});

const getInputGroup = () => {
  function closeInputHandler(e: MouseEvent) {
    const blockToRemove = (e.target as HTMLButtonElement).parentNode as HTMLElement;
    blockToRemove?.remove();

    forceUpdate(document.querySelector('#group-aside')!, GroupAside(true));
  }

  return {
    tag: 'li',
    options: {
      className: 'group-li',
    },
    children: [
      {
        tag: '',
        component: NameInput('', 'Введите название', 'group-input'),
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
};

export { getContactAsideStructure, getGroupListStructure, getInputGroup };
