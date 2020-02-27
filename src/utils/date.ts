export const addYears = (date: Date, years: number): Date => {
  return new Date(date.setFullYear(date.getFullYear() + years));
};
