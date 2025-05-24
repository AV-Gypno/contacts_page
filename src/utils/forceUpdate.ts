export default function forceUpdate(component: HTMLElement, rebuildFunction: () => HTMLElement) {
  component.remove();
  const app = document.querySelector('#app');
  console.log(rebuildFunction);
  return app?.append(rebuildFunction());
}
