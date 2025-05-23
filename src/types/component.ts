export interface IComponent {
  component?: HTMLElement;
  tag: string | '';
  options?: IOptions;
  children?: IComponent[];
  listeners?: {
    click?: Function;
    change?: Function;
    focus?: Function;
    blur?: Function;
  };
}

interface IOptions {
  id?: string;
  className?: string;
  src?: string;
  alt?: string;
  textContent?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
}
