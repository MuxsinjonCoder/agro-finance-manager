export function formatDateToDMY(date?: Date): string | undefined {
  if (!date) return;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function formatDateToMDY(date?: Date): string | undefined {
  if (!date) return;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
}

export function formatDateToMDY_HMS(date?: Date): string | undefined {
  if (!date) return;

  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months start from 0
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
}
