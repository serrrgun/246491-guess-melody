const render = (template) => {
  const wrapper = document.createElement(`template`);
  wrapper.innerHTML = template.trim();
  return wrapper.content;
};

const mainElement = document.querySelector(`.main`);

const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export {render, changeScreen};
