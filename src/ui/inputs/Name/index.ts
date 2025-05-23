import { generateComponent } from '../../../utils/componentGenerator';
import styles from './../common.module.scss';

const nameInput = {
  tag: 'input',
  options: { type: 'text', value: '', placeholder: 'Введите ФИО', className: styles['input'], required: true, id: 'name' },
};

const NameInput = () => {
  const component = generateComponent(nameInput);

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
