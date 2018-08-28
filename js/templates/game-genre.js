const template = (level) => {
  return `
    <section class="game game--genre">
      <section class="game__screen">
        <h2 class="game__title">${level.title}</h2>
        <form class="game__tracks">
           ${level.questions.map((question, it) => `
              <div class="track">
                <button class="track__button track__button--play" type="button"></button>
                <div class="track__status">
                  <audio src="${question.src}"></audio>
                </div>
                <div class="game__answer">
                  <input class="game__input visually-hidden" type="checkbox" name="answer" value="${question.genre}" id="answer-${it}">
                  <label class="game__check" for="answer-${it}">Отметить</label>
                </div>
              </div>`.trim()).join(``)}
    
          <button class="game__submit button" type="submit" disabled>Ответить</button>
        </form>
      </section>
    </section>`;

};

export default template;
