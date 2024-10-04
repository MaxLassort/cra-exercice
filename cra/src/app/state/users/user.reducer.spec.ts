// import { userReducer, UserState } from './user.reducer';  // Chemin vers ton réducteur
import * as UserActions from './user.action'; // Chemin vers tes actions
import {userReducer, UserState} from "./user.reducer";
import {User} from "../../core/models/user";

describe('User Selectors', () => {
  let mockUserState: UserState;
  it('should set users when setUsers action is dispatched', () => {
    const users: User[] = [
      {
        id: '1',
        name: 'Alice Smith',
        username: '',
        times: {
          vacationDays: new Set<string>(['2024-03-18T23:00:00.000Z']),
          dayWorkedSaved: new Set<string>(['2024-03-10T23:00:00.000Z']),
          vacationCountDown: 6
        },
      },
      {
        id: '2',
        name: 'Bob Johnson',
        username: '',
        times: {
          vacationDays: new Set<string>(),
          dayWorkedSaved: new Set<string>(),
          vacationCountDown: 7
        },
      },
    ];

    const action = UserActions.setUsers({users});
    const result = userReducer(mockUserState, action);

    expect(result.ids).toEqual(['1', '2']);
    expect(result.entities).toEqual({
      '1': users[0],
      '2': users[1],
    });

  });
})
