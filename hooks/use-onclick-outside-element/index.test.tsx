import { fireEvent, render, renderHook } from '@testing-library/react';
import { createRef } from 'react';
import { useOnClickOutsideElement, useOnClickOutsideElementsArray } from '.';

describe('hooks - use-onclick-outside-element', () => {
  const mockHandler = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('useOnClickOutsideElementsArray', () => {
    it('should call handler when click is outside element', () => {
      const ref = createRef<HTMLDivElement>();

      render(<div ref={ref}>Test element</div>);

      renderHook(() => {
        useOnClickOutsideElementsArray([ref], mockHandler);
      });
      fireEvent.click(document);

      expect(mockHandler).toHaveBeenCalled();
    });

    test('should not call handler when click is within element', () => {
      const ref = createRef<HTMLDivElement>();

      const { getByTestId } = render(
        <div ref={ref} data-testid="test-element">
          Test element
        </div>,
      );

      renderHook(() => {
        useOnClickOutsideElementsArray([ref], mockHandler);
      });
      fireEvent.click(getByTestId('test-element'));

      expect(mockHandler).not.toBeCalled();
    });
  });

  describe('useOnClickOutsideElement', () => {
    it('should not call handler when clicked only once', () => {
      const ref = createRef<HTMLDivElement>();

      render(<div ref={ref}>Test element</div>);

      renderHook(() => {
        useOnClickOutsideElement(ref, mockHandler);
      });
      fireEvent.click(document);

      expect(mockHandler).not.toHaveBeenCalled();
    });

    it('should call handler when click is outside element', () => {
      const ref = createRef<HTMLDivElement>();

      render(<div ref={ref}>Test element</div>);

      renderHook(() => {
        useOnClickOutsideElement(ref, mockHandler);
      });
      fireEvent.click(document);
      fireEvent.click(document);

      expect(mockHandler).toHaveBeenCalled();
    });

    test('should not call handler when click is within element', () => {
      const ref = createRef<HTMLDivElement>();

      const { getByTestId } = render(
        <div ref={ref} data-testid="test-element">
          Test element
        </div>,
      );

      renderHook(() => {
        useOnClickOutsideElement(ref, mockHandler);
      });
      fireEvent.click(getByTestId('test-element'));
      fireEvent.click(getByTestId('test-element'));

      expect(mockHandler).not.toBeCalled();
    });
  });
});
