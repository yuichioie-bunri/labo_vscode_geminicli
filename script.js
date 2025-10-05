// Copy buttons
const handler = (btn) => {
  const text = btn.getAttribute('data-copy');
  if (!navigator.clipboard) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  } else {
    navigator.clipboard.writeText(text);
  }
  const before = btn.textContent;
  btn.textContent = 'Copied';
  btn.setAttribute('aria-live', 'polite');
  setTimeout(() => {
    btn.textContent = before;
    btn.removeAttribute('aria-live');
  }, 1200);
};

for (const button of document.querySelectorAll('.copy')) {
  button.addEventListener('click', () => handler(button));
}

for (const codeBlock of document.querySelectorAll('pre code')) {
  codeBlock.addEventListener('dblclick', () => {
    const button = codeBlock.parentElement
      ? codeBlock.parentElement.querySelector('.copy')
      : null;
    if (button) {
      handler(button);
    }
  });
}
