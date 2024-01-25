const millisecondsToTime = (milliseconds: number) => {
  let hours = Math.floor(milliseconds / 360000).toString();
  let minutes = Math.floor(milliseconds / 60000).toString();
  let seconds = Math.floor(milliseconds / 1000).toString();

  if (hours.length <= 1) {
    hours = '0' + hours;
  }
  if (minutes.length <= 1) {
    minutes = '0' + minutes;
  }
  if (seconds.length <= 1) {
    seconds = '0' + seconds;
  }

  return `${hours}:${minutes}:${seconds}`;
};

export {millisecondsToTime};
