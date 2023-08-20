import { act, render, waitFor } from '@testing-library/react';
import { FC, useEffect, useRef } from 'react';
import {
  IMealEntries,
  MealEntriesContextProvider,
  initialState,
  useMealEntriesContext,
} from '.';
import { diaryService } from '@client/services/diary.service';
import { useUserContext } from '@store/user-context';

jest.mock('@client/services/diary.service');
jest.mock('@store/user-context');

const mockDate = '03-03-2023';

const TestComponent = () => <div>Test component</div>;

const DisplayEntries: FC<{
  entries: IMealEntries;
}> = ({ entries }) => (
  <>
    {Object.keys(entries).map((key) => (
      <div key={key}>
        Key: {key}
        <div>{JSON.stringify(entries[key])}</div>
      </div>
    ))}
  </>
);

const MockInitialEntries: FC<{ setEntries?: boolean }> = ({ setEntries }) => {
  const { mealEntries, requestSetMealEntries } = useMealEntriesContext();

  useEffect(() => {
    if (setEntries) {
      requestSetMealEntries({
        meals: {
          '01-02-2023': {
            snack_1: {
              contents: [
                { id: 's1_id_1', food: 's1_food_1' },
                { id: 's1_id_2', food: 's1_food_2' },
              ],
            },
            dinner: {
              contents: [{ id: 'd_id', food: 'd_food' }],
            },
          },
        },
      });
    }
  }, [requestSetMealEntries, setEntries]);

  return <DisplayEntries entries={mealEntries} />;
};

const MockRequestMealEntries: FC<{
  target: 'add' | 'update' | 'delete';
  alternate?: boolean;
}> = ({ target, alternate }) => {
  const runRef = useRef(false);
  const { mealEntries, addMealEntry, updateMealEntry, removeMealEntryById } =
    useMealEntriesContext();

  useEffect(() => {
    if (runRef.current) {
      return;
    }

    runRef.current = true;

    if (target === 'add') {
      addMealEntry({
        date: '02-02-2023',
        mealId: 'lunch',
        newValues: { id: 'new_id', food: 'new_food' },
      });
    } else if (target === 'update') {
      updateMealEntry({
        date: mockDate,
        mealId: 'breakfast',
        updatedMealId: alternate ? 'breakfast' : 'snack_2',
        updatedContent: { id: 'update_id', food: 'update_food' },
      });
    } else {
      removeMealEntryById({
        date: mockDate,
        mealId: 'dinner',
        contentId: 'delete_id',
      });
    }
  }, [target, alternate, addMealEntry, updateMealEntry, removeMealEntryById]);

  return <DisplayEntries entries={mealEntries} />;
};

describe('store - meal-entries-context', () => {
  const mockDiaryService = jest.mocked(diaryService);
  const mockUseUserContext = jest.mocked(useUserContext);
  const mockError = jest.fn();

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(mockError);
  });

  beforeEach(() => {
    mockDiaryService.createMealEntry.mockResolvedValue({} as any);
    mockDiaryService.updateMealEntry.mockResolvedValue({} as any);
    mockDiaryService.deleteMealEntry.mockResolvedValue({} as any);
    mockUseUserContext.mockReturnValue({ userLoggedIn: false } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    const {
      mealEntries,
      requestSetMealEntries,
      addMealEntry,
      updateMealEntry,
      removeMealEntryById,
    } = initialState;

    expect(mealEntries).toEqual({});
    expect(requestSetMealEntries({} as any)).toBeNull();
    expect(addMealEntry({} as any)).toBeNull();
    expect(updateMealEntry({} as any)).toBeNull();
    expect(removeMealEntryById({} as any)).toBeNull();
  });

  it('should render provider with children', () => {
    const { asFragment } = render(
      <MealEntriesContextProvider>
        <TestComponent />
      </MealEntriesContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with initial-state', () => {
    const { asFragment } = render(
      <MealEntriesContextProvider
        initialState={{
          ['02-02-2023']: {
            breakfast: {
              contents: [
                { id: 'b_1', food: 'b_food', description: 'b_description' },
              ],
            },
            lunch: {
              contents: [
                {
                  id: 'l_1',
                  food: 'l_food',
                  serving: 'l_serving',
                  quantity: 'l_quantity',
                },
              ],
            },
          },
        }}
      >
        <MockInitialEntries />
      </MealEntriesContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle null initial-state', () => {
    const { asFragment } = render(
      <MealEntriesContextProvider initialState={null as any}>
        <MockInitialEntries />
      </MealEntriesContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render initial entries with no initial-state', () => {
    const { asFragment } = render(
      <MealEntriesContextProvider>
        <MockInitialEntries />
      </MealEntriesContextProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set requested entries', async () => {
    const { asFragment } = render(
      <MealEntriesContextProvider>
        <MockInitialEntries setEntries />
      </MealEntriesContextProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe('Add-a-meal', () => {
    it('should add a meal entry for a logged-in user', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);

      const { asFragment } = render(
        <MealEntriesContextProvider>
          <MockRequestMealEntries target="add" />
        </MealEntriesContextProvider>,
      );

      await waitFor(() => {
        expect(mockDiaryService.createMealEntry).toHaveBeenCalledWith({
          body: {
            content: { food: 'new_food', id: 'new_id' },
            mealId: 'lunch',
          },
          date: '02-02-2023',
        });
      });
      expect(asFragment()).toMatchSnapshot();
    });

    it('should handle errors in adding a meal entry for a logged-in user', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);
      mockDiaryService.createMealEntry.mockResolvedValue({
        error: 'mock error occurred',
      });

      render(
        <MealEntriesContextProvider>
          <MockRequestMealEntries target="add" />
        </MealEntriesContextProvider>,
      );

      await act(() => Promise.resolve());

      expect(mockDiaryService.createMealEntry).toHaveBeenCalled();
      expect(mockError).toHaveBeenCalledWith(
        'Error creating entry:',
        'mock error occurred',
      );
    });

    it('should not send request when adding a meal entry for a non logged-in user', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: false } as any);

      render(
        <MealEntriesContextProvider>
          <MockRequestMealEntries target="add" />
        </MealEntriesContextProvider>,
      );

      expect(mockDiaryService.createMealEntry).not.toHaveBeenCalled();
    });
  });

  describe('Update-a-meal', () => {
    const initialState = {
      [mockDate]: {
        breakfast: {
          contents: [{ id: 'update_id', food: 'new_update_food' }],
        },
      },
    };

    it('should update a meal entry for a logged-in user from one type to another', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);

      const { asFragment } = render(
        <MealEntriesContextProvider initialState={initialState}>
          <MockRequestMealEntries target="update" />
        </MealEntriesContextProvider>,
      );

      await waitFor(() => {
        expect(mockDiaryService.updateMealEntry).toHaveBeenCalledWith({
          body: {
            content: {
              food: 'update_food',
              id: 'update_id',
            },
            newMealId: 'snack_2',
            oldMealId: 'breakfast',
          },
          date: '03-03-2023',
        });
      });
      expect(asFragment()).toMatchSnapshot();
    });

    it('should update a meal entry for a logged-in user from one type to another with no original contents', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);

      render(
        <MealEntriesContextProvider
          initialState={{
            [mockDate]: {
              breakfast: {} as any,
            },
          }}
        >
          <MockRequestMealEntries target="update" />
        </MealEntriesContextProvider>,
      );

      await waitFor(() => {
        expect(mockDiaryService.updateMealEntry).toHaveBeenCalledWith({
          body: {
            content: {
              food: 'update_food',
              id: 'update_id',
            },
            newMealId: 'snack_2',
            oldMealId: 'breakfast',
          },
          date: '03-03-2023',
        });
      });
    });

    it('should update a meal entry for a logged-in user for same types', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);

      const { asFragment } = render(
        <MealEntriesContextProvider initialState={initialState}>
          <MockRequestMealEntries target="update" alternate />
        </MealEntriesContextProvider>,
      );

      await waitFor(() => {
        expect(mockDiaryService.updateMealEntry).toHaveBeenCalledWith({
          body: {
            content: {
              food: 'update_food',
              id: 'update_id',
            },
            newMealId: 'breakfast',
            oldMealId: 'breakfast',
          },
          date: '03-03-2023',
        });
      });
      expect(asFragment()).toMatchSnapshot();
    });

    it('should handle errors in adding a meal entry for a logged-in user', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);
      mockDiaryService.updateMealEntry.mockResolvedValue({
        error: 'mock error occurred',
      });

      render(
        <MealEntriesContextProvider initialState={initialState}>
          <MockRequestMealEntries target="update" />
        </MealEntriesContextProvider>,
      );

      await waitFor(() => {
        expect(mockDiaryService.updateMealEntry).toHaveBeenCalled();
      });
      expect(mockError).toHaveBeenCalledWith(
        'Error updating entry:',
        'mock error occurred',
      );
    });

    it('should not send request when updating a meal entry for a non logged-in user', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: false } as any);

      render(
        <MealEntriesContextProvider initialState={initialState}>
          <MockRequestMealEntries target="update" />
        </MealEntriesContextProvider>,
      );

      expect(mockDiaryService.updateMealEntry).not.toHaveBeenCalled();
    });
  });

  describe('Delete-meal-entry', () => {
    const initialState = {
      [mockDate]: {
        dinner: {
          contents: [
            { id: 'delete_id', food: 'remove_food' },
            { id: 'other_id', food: 'd_stay_food' },
          ],
        },
        breakfast: {
          contents: [{ id: 'b_other_id', food: 'b_stay_food' }],
        },
      },
    };

    it('should remove entry for a logged in user', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);

      const { asFragment } = render(
        <MealEntriesContextProvider initialState={initialState}>
          <MockRequestMealEntries target="delete" />
        </MealEntriesContextProvider>,
      );

      await waitFor(() => {
        expect(mockDiaryService.deleteMealEntry).toHaveBeenCalledWith({
          body: { id: 'delete_id', mealId: 'dinner' },
          date: '03-03-2023',
        });
        expect(asFragment()).toMatchSnapshot();
      });
    });

    it('should handle remove entry for a logged in user with no original contents', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);

      render(
        <MealEntriesContextProvider
          initialState={{
            [mockDate]: {
              dinner: {} as any,
            },
          }}
        >
          <MockRequestMealEntries target="delete" />
        </MealEntriesContextProvider>,
      );

      await waitFor(() => {
        expect(mockDiaryService.deleteMealEntry).not.toHaveBeenCalled();
      });
    });

    it('should handle errors when removing entry for a logged in user', async () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: true } as any);
      mockDiaryService.deleteMealEntry.mockResolvedValue({
        error: 'mock error occurred',
      });

      render(
        <MealEntriesContextProvider initialState={initialState}>
          <MockRequestMealEntries target="delete" />
        </MealEntriesContextProvider>,
      );

      await waitFor(() => {
        expect(mockDiaryService.deleteMealEntry).toHaveBeenCalled();
      });
      expect(mockError).toHaveBeenCalledWith(
        'Error removing entry:',
        'mock error occurred',
      );
    });

    it('should remove entry for non-logged in user', () => {
      mockUseUserContext.mockReturnValue({ userLoggedIn: false } as any);

      render(
        <MealEntriesContextProvider initialState={initialState}>
          <MockRequestMealEntries target="delete" />
        </MealEntriesContextProvider>,
      );

      expect(mockDiaryService.deleteMealEntry).not.toHaveBeenCalled();
    });
  });
});
