import type { IComponent } from '../../types/component';
import CloseButton from '../../ui/buttons/Close';
import CancelButton from '../../ui/buttons/PopupButtons/Cancel';
import DeleteButton from '../../ui/buttons/PopupButtons/Delete';
import { generateComponent } from '../../utils/componentGenerator';

import './style.scss';

const getPopupStructure = (group: string): IComponent => ({
  tag: 'div',
  options: { className: 'popup', id: 'popup' },
  children: [
    { tag: 'h2', options: { className: 'popup-h', textContent: 'Удалить группу?' } },
    {
      tag: 'p',
      options: {
        className: 'popup-text',
        textContent: 'Удаление группы повлечет за собой удаление контактов связанных c этой группой',
      },
    },
    {
      tag: 'div',
      options: { className: 'popup-controls' },
      children: [
        {
          tag: '',
          component: DeleteButton(group),
        },
        {
          tag: '',
          component: CancelButton(),
        },
      ],
    },
    {
      tag: '',
      component: CloseButton(),
    },
  ],
});

const Popup = (group: string) => {
  const popup = generateComponent(getPopupStructure(group));

  return popup;
};

export default Popup;
