import IMask from 'imask';
import type { IComponent } from '../../../types/component';
import { generateComponent } from '../../../utils/componentGenerator';

import style from './../common.module.scss';

const getPhoneInputStructure = (value: string = '', placeholder: string = 'Введите номер', id: string = 'phone'): IComponent => ({
  tag: 'input',
  options: { type: 'text', value: value, placeholder: placeholder, className: style['input'], id: id },
});

const PhoneInput = (value?: string, placeholder?: string, id?: string) => {
  const component = generateComponent(getPhoneInputStructure(value, placeholder, id));

  IMask(component, {
    mask: '+{375}(00)000-00-00',
  });

  component.addEventListener('focus', (e: FocusEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length === 0) {
      target.value = '+375( ';
      target.setSelectionRange(5, 6);
    }
  });

  component.addEventListener('blur', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length !== 17) {
      target.value = '';
    }
  });

  component.addEventListener('keypress', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length >= 0) {
      target.classList.remove('mistake');
      target.parentElement?.querySelector('.tooltip.phone')?.classList.remove('mistake');
    }
  });
  return component;
};

export default PhoneInput;
