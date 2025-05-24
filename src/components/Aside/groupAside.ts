import LocalStorage from '../../db/localStorage';
import type { IComponent } from '../../types/component';
import AddGroupButton from '../../ui/buttons/AddGroup';
import CloseButton from '../../ui/buttons/Close';
import SaveButton from '../../ui/buttons/Save';
import DeleteSVG from '../../ui/icons/delete';
import { generateComponent } from '../../utils/componentGenerator';
import forceUpdate from '../../utils/forceUpdate';
import deleteImg from './../../assets/icons/delete.svg';

import './style.scss';

const getGroupsStructure = (): IComponent[] => {
  console.log(deleteImg);
  const groups = LocalStorage.getGroups();

  return groups.map((group: string) => ({
    tag: 'li',
    options: {
      className: 'group',
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

const getGroupsListStructure = (isActive: boolean): IComponent => {
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
          { tag: '', component: AddGroupButton(clickHandler) },
          { tag: '', component: SaveButton(clickHandler) },
        ],
      },
    ],
  };
};

function clickHandler() {
  console.log('handle');
}

const deleteClickHandler = (e: MouseEvent) => {
  const target = e.target as HTMLButtonElement;
  const groupName = target.id;

  LocalStorage.deleteGroup(groupName);
  forceUpdate(document.querySelector('#group-aside')!, GroupAside(true));
};

const GroupAside = (isActive: boolean = false) => {
  return () => {
    const GroupAside = generateComponent(getGroupsListStructure(isActive));

    return GroupAside;
  };
};

export default GroupAside();
