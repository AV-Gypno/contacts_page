export interface IComponent {
  component?: HTMLElement;
  tag: string | '';
  options?: IOptions;
  children?: IComponent[];
}

interface IOptions {
  id?: string;
  className?: string;
  src?: string;
  alt?: string;
  textContent?: string;
}
