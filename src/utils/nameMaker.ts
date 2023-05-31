const nameMaker = (): string => {
  const date = new Date();

  return `${date
    .toDateString()
    .split(' ')
    .join(
      '-'
    )}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;
};

export default nameMaker;
