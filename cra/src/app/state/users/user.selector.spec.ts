import {adapter, UserState} from './user.reducer';
import {selectAllUsers, selectUserState,} from './user.selector';

// Create a mock initial state for testing
const mockUserState: UserState = adapter.getInitialState({
  ids: ['1', '2'], // Array of user IDs
  entities: {      // Dictionary of user entities
    '1': {
      id: "1",
      name: "Alice Smith",
      username: "",
      times: {
        vacationDays: new Set<string>(["2024-03-18T23:00:00.000Z"]),
        dayWorkedSaved: new Set<string>(["2024-03-10T23:00:00.000Z"]),
      }
    },
    '2': {
      id: "2",
      name: "Bob Johnson",
      username: "",
      times: {
        vacationDays: new Set<string>(),
        dayWorkedSaved: new Set<string>(),
      }
    },
  },
});
// Describe the test suite
describe('User Selectors', () => {
  it('should select the user state', () => {
    const result = selectUserState.projector(mockUserState);
    expect(result).toEqual(mockUserState);
  });

  it('should select all users', () => {
    const result = selectAllUsers.projector(mockUserState);
    expect(result).toEqual([
      {
        id: "1",
        name: "Alice Smith",
        username: "",
        times: {
          vacationDays: new Set<string>(["2024-03-18T23:00:00.000Z"]),
          dayWorkedSaved: new Set<string>(["2024-03-10T23:00:00.000Z"]),
        }
      },
      {
        id: "2",
        name: "Bob Johnson",
        username: "",
        times: {
          vacationDays: new Set<string>(),
          dayWorkedSaved: new Set<string>(),
        }
      },
    ]);
  });

});
