const render = (template, name) => {
  const wrapper = document.createElement(`section`);
  wrapper.innerHTML = template.trim();
  wrapper.setAttribute(`class`, name);
  return wrapper;
};

const mainElement = document.querySelector(`.main`);

const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export {render, changeScreen};
