const createAutoComplete = ({
  root,
  renderOption,
  onSelect,
  inputValue,
  getItems,
}) => {
  root.innerHTML = `
    <input type="text" class="input" placeholder="Search Movies....." />
    <ul class="items"></ul>
    `;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.items');
  const resultWrapper = root.querySelector('.results');

  const onInput = async (event) => {
    const items = await getItems(event.target.value);
    dropdown.innerHTML = '';
    dropdown.classList.remove('is-hidden');
    for (let item of items) {
      const options = document.createElement('li');
      options.classList.add('item');
      options.innerHTML = renderOption(item);
      options.addEventListener('click', () => {
        dropdown.classList.add('is-hidden');
        input.value = inputValue(item);
        onSelect(item);
      });
      dropdown.appendChild(options);
    }
  };
  input.addEventListener('input', debounce(onInput, 1000));

  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.add('is-hidden');
    }
  });
};
