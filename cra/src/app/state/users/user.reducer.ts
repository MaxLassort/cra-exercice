import {createReducer, on} from "@ngrx/store";
import {User} from "../../core/models/user";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import * as UserActions from "./user.action";
import {setUser} from "./user.action";

export interface UserState extends EntityState<User> {
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();
export const initialState: UserState = adapter.getInitialState({});

export const userReducer = createReducer(
  initialState,
  on(UserActions.setUsers, (state, { users }) => {
    return adapter.setAll(users, state)
  }),
  on(UserActions.setUser, (state, { user }) => {
    return adapter.setOne(user, state)
  }),
);


// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();



// select the array of users
export const selectAllUsers = selectAll;


