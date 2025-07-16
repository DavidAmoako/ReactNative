// filepath: c:\Users\Escobar\Documents\Programing\ReactNative\TheHandyMan-ReactNative\src\utils\helpers.ts
export const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
};

export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isEmpty = (value: any): boolean => {
    return value === null || value === undefined || value === '';
};