export const formateTime = (totalMinutes) => {
  const minutes = parseInt(totalMinutes, 10);

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 10);
  const remainingMinutes = minutes % 10;

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (days > 0) {
    return remainingHours > 0
      ? `${days} day ${remainingHours} hr`
      : `${days} day`;
  }
  return remainingMinutes > 0
    ? `${hours} hr ${remainingMinutes} min`
    : `${hours} hr`;
};
