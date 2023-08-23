import { diaryService } from '@client/services/diary.service';
import { TDrink, WellnessEntriesContextProvider, initialState } from '.';
import { act, render, waitFor } from '@testing-library/react';
import { FC, useEffect, useRef } from 'react';
import { IWellnessEntries } from '@lib/interfaces/wellness.interface';
import { useUserContext } from '@store/user-context';
import { useWellnessEntriesContext } from '.';

jest.useFakeTimers();
jest.mock('@client/services/diary.service');
jest.mock('@store/user-context');

const DisplayEntry: FC<{
  entries: IWellnessEntries;
  wellnessUpdated: boolean;
}> = ({ entries, wellnessUpdated }) => (
  <>
    {Object.keys(entries).map((key) => (
      <div key={key}>
        Key: {key}
        <div>{JSON.stringify(entries[key])}</div>
      </div>
    ))}
    <div>wellnessUpdated: {wellnessUpdated.toString()}</div>
  </>
);

const TestComponent = () => <div>Test component</div>;

const MockInitialEntries: FC<{ setEntries?: boolean }> = ({ setEntries }) => {
  const { wellnessEntries, wellnessUpdated, requestSetWellnessEntries } =
    useWellnessEntriesContext();

  useEffect(() => {
    if (setEntries) {
      requestSetWellnessEntries({
        wellness: {
          '01-02-2023': {
            water: { value: 5 },
            tea_coffee: { value: 2 },
            alcohol: { value: 1 },
            excercise: { time: '00:15', details: 'Run and walk' },
          },
        },
      });
    }
  }, [requestSetWellnessEntries, setEntries]);

  return (
    <DisplayEntry entries={wellnessEntries} wellnessUpdated={wellnessUpdated} />
  );
};

const MockUpdateEntry: FC<{
  runBothUpdates?: boolean;
  runResetWellnessUpdated?: boolean;
}> = ({ runBothUpdates = false, runResetWellnessUpdated = false }) => {
  const runRef = useRef(false);
  const {
    wellnessEntries,
    wellnessUpdated,
    updateEntryByKey,
    resetWellnessUpdated,
  } = useWellnessEntriesContext();

  useEffect(() => {
    if (runRef.current) {
      return;
    }

    runRef.current = true;

    updateEntryByKey<TDrink>({
      date: '01-02-2023',
      type: 'water',
      content: { value: 4 },
    });
    if (runBothUpdates) {
      updateEntryByKey<TDrink>({
        date: '01-02-2023',
        type: 'alcohol',
        content: { value: 7 },
      });
    }
  }, [runBothUpdates, updateEntryByKey]);

  useEffect(() => {
    if (Object.entries(wellnessEntries).length && runResetWellnessUpdated) {
      resetWellnessUpdated();
    }
  }, [wellnessEntries, runResetWellnessUpdated, resetWellnessUpdated]);

  return (
    <DisplayEntry entries={wellnessEntries} wellnessUpdated={wellnessUpdated} />
  );
};

describe('store - wellness-entries-context', () => {
  const mockDiaryService = jest.mocked(diaryService);
  const mockUseUserContext = jest.mocked(useUserContext);
  const mockError = jest.fn();

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(mockError);
  });

  beforeEach(() => {
    mockDiaryService.updateWellnessEntries.mockResolvedValue({});
    mockUseUserContext.mockReturnValue({ userLoggedIn: false } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    const {
      wellnessEntries,
      wellnessUpdated,
      requestSetWellnessEntries,
      updateEntryByKey,
      resetWellnessUpdated,
    } = initialState;

    expect(wellnessEntries).toEqual({});
    expect(wellnessUpdated).toEqual(false);
    expect(requestSetWellnessEntries({} as any)).toBeNull();
    expect(updateEntryByKey({} as any)).toBeNull();
    expect(resetWellnessUpdated()).toBeNull();
  });

  it('should render provider with children', () => {
    const { asFragment } = render(
      <WellnessEntriesContextProvider>
        <TestComponent />
      </WellnessEntriesContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with initial-state', () => {
    const { asFragment } = render(
      <WellnessEntriesContextProvider
        initialState={{
          ['02-02-2023']: {
            water: { value: 5 },
            excercise: { time: '00:35' },
          },
        }}
      >
        <MockInitialEntries />
      </WellnessEntriesContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle null initial state', () => {
    const { asFragment } = render(
      <WellnessEntriesContextProvider initialState={null as any}>
        <MockInitialEntries />
      </WellnessEntriesContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render initial entries', () => {
    const { asFragment } = render(
      <WellnessEntriesContextProvider>
        <MockInitialEntries />
      </WellnessEntriesContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set entries', async () => {
    const { asFragment } = render(
      <WellnessEntriesContextProvider>
        <MockInitialEntries setEntries />
      </WellnessEntriesContextProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should update entry for non-logged in user', async () => {
    mockUseUserContext.mockReturnValue({ userLoggedIn: false } as any);

    const { asFragment } = render(
      <WellnessEntriesContextProvider>
        <MockUpdateEntry />
      </WellnessEntriesContextProvider>,
    );

    expect(mockDiaryService.updateWellnessEntries).not.toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should update entry for logged in user', async () => {
    mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);

    const { asFragment } = render(
      <WellnessEntriesContextProvider>
        <MockUpdateEntry />
      </WellnessEntriesContextProvider>,
    );

    await act(() => Promise.resolve());
    jest.advanceTimersByTime(1000);

    expect(mockDiaryService.updateWellnessEntries).toHaveBeenCalledWith({
      body: { '01-02-2023': { date: '01-02-2023', water: { value: 4 } } },
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle entry added to same date and not re-add date and allow for reset entries', async () => {
    mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);

    render(
      <WellnessEntriesContextProvider>
        <MockUpdateEntry runBothUpdates runResetWellnessUpdated />
      </WellnessEntriesContextProvider>,
    );

    await act(() => Promise.resolve());
    jest.advanceTimersByTime(1000);

    expect(mockDiaryService.updateWellnessEntries).toHaveBeenCalledWith({
      body: { '01-02-2023': { alcohol: { value: 7 }, date: '01-02-2023' } },
    });
  });

  it('should catch errors from updateWellnessEntries request', async () => {
    mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);
    mockDiaryService.updateWellnessEntries.mockResolvedValue({
      error: 'mock error occurred',
    });

    render(
      <WellnessEntriesContextProvider>
        <MockUpdateEntry />
      </WellnessEntriesContextProvider>,
    );

    await act(() => Promise.resolve());
    jest.advanceTimersByTime(1000);
    await act(() => Promise.resolve());

    expect(mockDiaryService.updateWellnessEntries).toHaveBeenCalled();
    expect(mockError).toHaveBeenCalledWith(
      'Error updating wellness entries:',
      'mock error occurred',
    );
  });
});
