// src/utils/typeConverters.ts
export const toNumber = (value: any, defaultValue: number | null = null): number | null => {
  if (value === null || value === undefined || value === '') {
    return defaultValue;
  }
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};