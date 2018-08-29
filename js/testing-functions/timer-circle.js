const getRadius = (ratio, radius) => {
  const stroke = Math.round(2 * Math.PI * radius);
  const offset = stroke - Math.round(stroke * ratio);
  return {
    stroke,
    offset,
  };
};

export {getRadius};
