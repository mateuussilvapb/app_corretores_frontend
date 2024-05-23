export function removeNullValues(obj: Record<string, any>) {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== null) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Record<string, any>);
}

export const isEmpty = (arr: any[]): boolean => arr == null || arr.length === 0;
