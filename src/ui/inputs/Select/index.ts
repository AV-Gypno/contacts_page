import type { IComponent } from '../../../types/component';
import { generateComponent } from '../../../utils/componentGenerator';

import styles from './style.module.scss';

const getOption = (text: string): IComponent => {
  return {
    tag: 'div',
    options: { className: styles['option'], textContent: text },
  };
};

const select: IComponent = {
  tag: 'div',
  options: { className: styles['select'] },
  children: [
    {
      tag: 'div',
      options: { className: styles['select__header'] },
      children: [
        {
          tag: 'span',
          options: { textContent: 'Выберите группу', className: styles['select__current'], id: 'group' },
        },
        {
          tag: 'span',
          options: { className: styles['arrow'] },
        },
      ],
    },
    {
      tag: 'div',
      options: { className: styles['select__options'] },
      children: [getOption('Группа 1'), getOption('Группа 2'), getOption('Группа 3')],
    },
  ],
};

const getSelector = (selector: string) => `.${styles[selector]}`;

const Select = () => {
  const Select = generateComponent(select);

  const selectHeader = Select.querySelector(getSelector('select__header'));
  const selectOptions = Select.querySelector(getSelector('select__options')) as HTMLElement;
  const selectCurrent = Select.querySelector(getSelector('select__current')) as HTMLElement;
  const arrow = Select.querySelector(getSelector('arrow')) as HTMLElement;
  const options = Select.querySelectorAll(getSelector('option'));

  selectHeader?.addEventListener('click', () => {
    selectOptions.style.display = selectOptions?.style.display === 'block' ? 'none' : 'block';
    selectHeader.classList.toggle(styles['open']);
    arrow.classList.toggle(styles['open']);
  });

  options.forEach((option) => {
    option.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      selectCurrent.textContent = target.textContent;
      selectOptions.style.display = 'none';
      arrow.classList.remove(styles['open']);

      options.forEach((opt) => opt.classList.remove(styles['selected']));
      selectHeader?.classList.remove(styles['open']);
      target.classList.add(styles['selected']);
    });
  });

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(getSelector('select'))) {
      selectOptions.style.display = 'none';
      arrow.classList.remove(styles['open']);
      selectHeader?.classList.remove(styles['open']);
    }
  });

  return Select;
};

export default Select;
