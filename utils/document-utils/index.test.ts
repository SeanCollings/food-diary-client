import { detectAutofill } from '.';

describe('document-utils', () => {
  const mockId = 'mock_id';

  describe('detectAutofill', () => {
    const mockCallback = jest.fn();
    let windowSpy: jest.SpyInstance;

    afterEach(() => {
      jest.clearAllMocks();
      windowSpy.mockRestore();
    });

    it('should detect element auto-fill and invoke callback if appearance equal to menulist-button', () => {
      jest
        .spyOn(document, 'getElementById')
        .mockReturnValue({ id: 'mock_element' } as HTMLElement);
      windowSpy = jest.spyOn(window, 'window', 'get').mockReturnValue({
        getComputedStyle: jest.fn().mockImplementation(() => ({
          getPropertyValue: jest.fn().mockReturnValue('menulist-button'),
        })),
      } as any);

      detectAutofill(mockId, mockCallback);
      expect(mockCallback).toHaveBeenCalled();
    });

    it('should detect element auto-fill and not invoke callback if different appearance', () => {
      jest
        .spyOn(document, 'getElementById')
        .mockReturnValue({ id: 'mock_element' } as HTMLElement);
      windowSpy = jest.spyOn(window, 'window', 'get').mockReturnValue({
        getComputedStyle: jest.fn().mockImplementation(() => ({
          getPropertyValue: jest.fn().mockReturnValue('another-thing'),
        })),
      } as any);

      detectAutofill(mockId, mockCallback);
      expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should not invoke callback if element not found', () => {
      jest.spyOn(document, 'getElementById').mockReturnValue(null);

      detectAutofill(mockId, mockCallback);
      expect(mockCallback).not.toHaveBeenCalled();
    });
  });
});
