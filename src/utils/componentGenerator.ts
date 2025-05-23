import type { IComponent } from '../types/component';

type HTMLElementType = ReturnType<typeof generateComponent>;
type OptionType = IComponent['options'];

function setOptions(component: HTMLElementType, options: OptionType) {
  if (options)
    Object.keys(options).forEach((key) => {
      const optionKey = key as keyof OptionType;
      if (options[optionKey]) {
        (component as Record<string, any>)[key] = options[optionKey];
      }
    });
}

function setChildren(component: HTMLElementType, children?: IComponent['children']) {
  if (!children) return;
  const childElements = children.map((child: IComponent) => generateComponent(child));
  component?.append(...childElements);
}

export function generateComponent(data: IComponent): HTMLElement {
  if (data.component) return data.component;

  const component = document.createElement(data.tag);
  if (data.options) setOptions(component, data.options);
  if (data.children) setChildren(component, data.children);

  return component;
}
