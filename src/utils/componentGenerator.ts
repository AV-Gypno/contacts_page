import type { IComponent } from '../types/component';

type HTMLElementType = ReturnType<typeof generateComponent>;
type OptionType = IComponent['options'];

function setOptions(component: HTMLElementType, options: OptionType) {
  if (options)
    Object.keys(options).forEach((option) => {
      const optionKey = option as keyof OptionType;
      if (options[optionKey]) {
        (component as Record<string, any>)[option] = options[optionKey];
      }
    });
}

function setChildren(component: HTMLElementType, children?: IComponent['children']) {
  if (!children) return;
  const childElements = children.map((child: IComponent) => generateComponent(child));
  component?.append(...childElements);
}

function setListeners(component: HTMLElementType, listeners: IComponent['listeners']) {
  if (!listeners) return;
  Object.keys(listeners).forEach((trigger) => {
    component.addEventListener(trigger, listeners[trigger as keyof OptionType]);
  });
}

export function generateComponent(data: IComponent): HTMLElement {
  if (data.component) return data.component;

  const component = document.createElement(data.tag);
  if (data.options) setOptions(component, data.options);
  if (data.children) setChildren(component, data.children);
  if (data.listeners) setListeners(component, data.listeners);

  return component;
}
