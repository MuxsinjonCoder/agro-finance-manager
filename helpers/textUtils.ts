export const truncateText = (
  content: string,
  maxLength: number = 100
): string => {
  return content?.length > maxLength
    ? `${content?.slice(0, maxLength)}...`
    : content;
};

export const formatNumberWithSpaces = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};


export const formatStringWithSpaces = (value: string) => {
  if (typeof value !== "string") return value;
  return value?.replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Форматируем число с пробелами
};