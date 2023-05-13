export const detectAutofill = (id: string, callback: () => void) => {
  const inputElement = document.getElementById(
    `${id}_form_input`,
  ) as HTMLInputElement;

  if (!inputElement) {
    return;
  }

  const isAutoFilled =
    window
      .getComputedStyle(inputElement, null)
      .getPropertyValue('appearance') === 'menulist-button';

  if (isAutoFilled) {
    callback();
  }
};
