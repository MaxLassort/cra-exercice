import {UserState} from "./users/user.reducer";
import {User} from "../core/models/user";

export interface AppState {
  users:UserState
}
export const initialUserState:User[] = [{
    id:"1",
    name: "Alice Smith",
    username: "",
    times: {
      vacationDays: new Set<string>(["2024-01-18T23:00:00.000Z"]),
      dayWorkedSaved: new Set<string>(["2024-01-10T23:00:00.000Z"]),
      vacationCountDown: 6
    }
  },
    {
      id: "2",
      name: "Bob Johnson",
      username: "",
      times: {
        vacationDays: new Set<string>(),
        dayWorkedSaved: new Set<string>(),
        vacationCountDown: 7
      }
    },
    {
      id: "3",
      name: "Charlie Brown",
      username: "",
      times: {
        vacationDays: new Set<string>(),
        dayWorkedSaved: new Set<string>(),
        vacationCountDown: 7
      }
    }
  ];
