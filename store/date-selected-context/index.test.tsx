import { FC, useEffect } from 'react';
import { act, render } from '@testing-library/react';
import {
  DateSelectedContextProvider,
  initialState,
  useDateSelectedContext,
} from '.';

const TestComponent = () => <div>Test component</div>;

const MockComponent: FC<{ update?: boolean }> = ({ update }) => {
  const { dateSelectedISO, updateSelectedDateISO } = useDateSelectedContext();

  useEffect(() => {
    if (update) {
      updateSelectedDateISO('01-01-2023');
    }
  }, [update, updateSelectedDateISO]);

  return <div>{dateSelectedISO}</div>;
};

describe('store - dates-selected-context', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    const { dateSelectedISO, updateSelectedDateISO } = initialState;

    expect(dateSelectedISO).toEqual('');
    expect(updateSelectedDateISO({} as any)).toBeNull();
  });

  it('should render provider with children', () => {
    const { asFragment } = render(
      <DateSelectedContextProvider>
        <TestComponent />
      </DateSelectedContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should return default date', async () => {
    const { asFragment } = render(
      <DateSelectedContextProvider>
        <MockComponent />
      </DateSelectedContextProvider>,
    );

    await act(() => Promise.resolve());

    expect(asFragment()).toMatchSnapshot();
  });

  it('should update state date', async () => {
    const { asFragment } = render(
      <DateSelectedContextProvider>
        <MockComponent update />
      </DateSelectedContextProvider>,
    );

    await act(() => Promise.resolve());

    expect(asFragment()).toMatchSnapshot();
  });
});
