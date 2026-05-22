export const capitalizeFirstLetter = (value: string) => {
  const firstCharacterIndex = value.search(/\S/);

  if (firstCharacterIndex < 0) {
    return value;
  }

  return (
    value.slice(0, firstCharacterIndex) +
    value.charAt(firstCharacterIndex).toUpperCase() +
    value.slice(firstCharacterIndex + 1)
  );
};
