import { generateComponent } from '../../../utils/componentGenerator';
import styles from './../common.module.scss';

const getNameInputStructure = (value: string = '', placeholder: string = 'Введите ФИО', id: string = 'name') => ({
  tag: 'input',
  options: { type: 'text', value: value, placeholder: placeholder, className: styles['input'], required: true, id: id },
});

const NameInput = (value?: string, text?: string, id?: string) => {
  const component = generateComponent(getNameInputStructure(value, text, id));

  component.addEventListener('keypress', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length >= 0) {
      target.classList.remove('mistake');
      target.parentElement?.querySelector('.tooltip.name')?.classList.remove('mistake');
    }
  });
  return component;
};

export default NameInput;
