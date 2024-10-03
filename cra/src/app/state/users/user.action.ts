import {createAction, createActionGroup, emptyProps, props} from "@ngrx/store";
import {User} from "../../core/models/user";

export const usersActions = createActionGroup({
  source: 'Users',
  events: {
    'Update Times':  props<{ user:User }>(),
    'Update Times Success': props<{ users: User[] }>(),
    'Update Times Failure': props<{ error: any }>()
  },
});
export const setUsers = createAction('[User/API] Set Users', props<{ users: User[] }>());
export const setUser = createAction('[User/API] Set User', props<{ user: User }>());

