import { FC, useEffect } from 'react';
import {
  AllEntriesPerMonthContextProvider,
  initialState,
  useAllEntriesPerMonthContext,
} from '.';
import { act, render } from '@testing-library/react';

const TestComponent = () => <div>Test component</div>;

const MockComponent: FC<{ update?: boolean }> = ({ update }) => {
  const { allEntriesPerMonth, requestSetAllEntriesPerMonth } =
    useAllEntriesPerMonthContext();

  useEffect(() => {
    if (update) {
      requestSetAllEntriesPerMonth({
        entries: {
          ['09-2022']: [3],
          ['10-2022']: [1, 6, 9, 12, 16, 29],
          ['11-2022']: [1, 2, 3, 4, 5, 6],
          ['12-2022']: [15, 22, 23, 26],
        },
      });
    }
  }, [update, requestSetAllEntriesPerMonth]);

  return <div>All entries: {JSON.stringify(allEntriesPerMonth)}</div>;
};

describe('store - all-entries-per-month-context', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    const { allEntriesPerMonth, requestSetAllEntriesPerMonth } = initialState;

    expect(allEntriesPerMonth).toEqual({});
    expect(requestSetAllEntriesPerMonth({} as any)).toBeNull();
  });

  it('should render provider with children', () => {
    const { asFragment } = render(
      <AllEntriesPerMonthContextProvider>
        <TestComponent />
      </AllEntriesPerMonthContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should return default date', async () => {
    const { asFragment } = render(
      <AllEntriesPerMonthContextProvider>
        <MockComponent />
      </AllEntriesPerMonthContextProvider>,
    );

    await act(() => Promise.resolve());

    expect(asFragment()).toMatchSnapshot();
  });

  it('should return default date', async () => {
    const { asFragment } = render(
      <AllEntriesPerMonthContextProvider>
        <MockComponent update />
      </AllEntriesPerMonthContextProvider>,
    );

    await act(() => Promise.resolve());

    expect(asFragment()).toMatchSnapshot();
  });
});
