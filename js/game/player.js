const playerGameGenre = (elem) => {
  const buttonsPlayMusic = [...elem.querySelectorAll(`.track__button`)];
  const musics = [...elem.querySelectorAll(`audio`)];
  buttonsPlayMusic[0].classList.add(`track__button--pause`);
  musics[0].play();

  buttonsPlayMusic.forEach((btn, index) => {
    btn.addEventListener(`click`, (event) => {
      event.preventDefault();

      if (btn.classList.contains(`track__button--pause`)) {
        btn.classList.remove(`track__button--pause`);
        musics[index].pause();
      } else {
        for (let i = 0; i < buttonsPlayMusic.length; i++) {
          buttonsPlayMusic[i].classList.remove(`track__button--pause`);
          musics[i].pause();
        }

        btn.classList.add(`track__button--pause`);
        musics[index].play();
      }
    });
  });
};

const playerGameArtist = (temp) => {
  const btnPlayMusic = temp.querySelector(`.track__button`);
  const audio = temp.querySelector(`audio`);

  btnPlayMusic.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    btnPlayMusic.classList.toggle(`track__button--pause`);

    if (btnPlayMusic.classList.contains(`track__button--pause`)) {
      audio.play();
    } else {
      audio.pause();
    }
  });
};

export {playerGameGenre, playerGameArtist};
