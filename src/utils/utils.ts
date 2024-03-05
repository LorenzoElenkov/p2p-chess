export const getRowNumberTextColor = (isWhiteBoard: boolean, n: number) => {
  const isEven = n % 2 === 0;
  return isWhiteBoard
    ? isEven
      ? 'text-gray-500'
      : 'text-white'
    : isEven
    ? 'text-white'
    : 'text-gray-500';
};
