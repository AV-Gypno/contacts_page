const getToastStructure = (text: string, img: string) => {
  return {
    tag: 'div',
    options: { className: 'toast', id: 'toast' },
    children: [
      {
        tag: 'img',
        options: { className: 'toast-img', src: img },
      },
      { tag: 'p', options: { className: 'toast-text', textContent: text } },
    ],
  };
};

export { getToastStructure };
