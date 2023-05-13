import {
  RECAPTCHA_ID,
  createRecaptchaScript,
  getRecaptchaToken,
  hideRecaptchaBadge,
} from '.';

describe('grecaptcha-utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRecaptchaScript', () => {
    const mockAppendChild = jest.fn();

    beforeEach(() => {
      jest
        .spyOn(document.body, 'appendChild')
        .mockImplementation(mockAppendChild);
    });

    it('should add a recaptcha to document if it doesnt exist', () => {
      jest.spyOn(document, 'getElementById').mockReturnValue(null);
      jest.spyOn(document, 'createElement').mockReturnValue({} as any);

      createRecaptchaScript();
      expect(mockAppendChild).toHaveBeenCalledWith(
        expect.objectContaining({
          id: RECAPTCHA_ID,
          src: 'https://www.google.com/recaptcha/api.js?render=undefined',
        })
      );
    });

    it('should not add recaptcha if it already exists', () => {
      jest
        .spyOn(document, 'getElementById')
        .mockReturnValue({ id: 'any' } as HTMLElement);

      createRecaptchaScript();
      expect(mockAppendChild).not.toHaveBeenCalled();
    });
  });

  describe('getRecaptchaToken', () => {
    const mockExcute = jest.fn();
    let windowSpy: jest.SpyInstance;
    const oringinalEnv = { ...process.env };

    const mockGrecaptcha = {
      ready: jest.fn().mockImplementation(async (cb) => cb()),
      execute: jest.fn().mockImplementation(mockExcute),
    } as any;

    beforeEach(() => {
      windowSpy = jest
        .spyOn(window, 'window', 'get')
        .mockReturnValue({ grecaptcha: mockGrecaptcha } as any);

      process.env.RECAPTCHA_SITE_KEY = 'mock_recaptcha_site_key';
    });

    afterEach(() => {
      windowSpy.mockRestore();
      process.env = oringinalEnv;
    });

    it('should get a recaptacha for an action', async () => {
      await getRecaptchaToken('create');
      expect(mockExcute).toHaveBeenCalledWith('mock_recaptcha_site_key', {
        action: 'create',
      });
    });
  });

  describe('hideRecaptchaBadge', () => {
    it('should hide the recaptcha badge if badge exists', () => {
      const mockBadge = { style: { display: 'block' } };
      jest.spyOn(document, 'querySelector').mockReturnValue(mockBadge as any);

      hideRecaptchaBadge();
      expect(mockBadge.style.display).toEqual('none');
    });
  });
});
