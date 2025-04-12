export const formatTime = (time: number) => {
  const min = Math.floor(time / 60);
  const sec = Math.round(time % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
};
