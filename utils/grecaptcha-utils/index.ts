// https://www.cluemediator.com/how-to-implement-recaptcha-v3-in-react#agric
// https://stackoverflow.com/questions/53832882/react-and-recaptcha-v3

export type RecaptchaTypes = 'create' | 'login' | 'reset';

export const RECAPTCHA_ID = 'recaptcha_id';

export const createRecaptchaScript = () => {
  const scriptExist = document.getElementById(RECAPTCHA_ID);

  if (!scriptExist) {
    // Add reCaptcha
    const script = document.createElement('script');
    script.id = RECAPTCHA_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_SITE_KEY}`;
    document.body.appendChild(script);
  }
};

export const getRecaptchaToken = async (
  action: RecaptchaTypes
): Promise<string> => {
  return await new Promise((resolve) =>
    window.grecaptcha.ready(() =>
      resolve(
        window.grecaptcha.execute(process.env.RECAPTCHA_SITE_KEY as string, {
          action,
        })
      )
    )
  );
};

export const hideRecaptchaBadge = () => {
  const grecaptchaBadgeEl = document.querySelector(
    '.grecaptcha-badge'
  ) as HTMLElement;

  if (grecaptchaBadgeEl) {
    grecaptchaBadgeEl.style.display = 'none';
  }
};
