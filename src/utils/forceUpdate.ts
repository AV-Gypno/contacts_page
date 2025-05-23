export default function forceUpdate(component: HTMLElement, rebuildFunction: () => HTMLElement) {
  component.remove();
  const app = document.querySelector('#app');
  return app?.append(rebuildFunction());
}
