import type { IComponent } from '../../types/component';
import CloseButton from '../../ui/buttons/Close';
import SaveButton from '../../ui/buttons/Save';
import { generateComponent } from '../../utils/componentGenerator';

const contactAside: IComponent = {
  tag: 'aside',
  options: { className: 'aside', id: 'group-aside' },
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

    { tag: 'div', options: { className: 'aside__footer' }, children: [{ tag: '', component: SaveButton(clickHandler) }] },
  ],
};

function clickHandler() {
  console.log('handle');
}

const GroupAside = generateComponent(contactAside);

export default GroupAside;
