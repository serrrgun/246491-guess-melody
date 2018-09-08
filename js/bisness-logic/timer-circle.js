const FULL_TIME = 300;
const RADIUS = 370;
const MIN_TIME = 30;

const getRadius = (ratio, radius) => {
  const stroke = Math.round(2 * Math.PI * radius);
  const offset = stroke - Math.round(stroke * ratio);
  return {
    stroke,
    offset,
  };
};

export {getRadius, FULL_TIME, RADIUS, MIN_TIME};
