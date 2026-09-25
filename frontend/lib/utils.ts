type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: boolean | null | undefined }
  | ClassValue[];

function classNames(...inputs: ClassValue[]): string {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === "string" || typeof input === "number") {
        return [String(input)];
      }
      if (Array.isArray(input)) return [classNames(...input)];
      return Object.entries(input)
        .filter(([, value]) => value)
        .map(([key]) => key);
    })
    .join(" ");
}

export function cn(...inputs: ClassValue[]) {
  return classNames(...inputs);
}