import { createAction, props } from '@ngrx/store';
import {User} from "../../core/models/user";

export const loadUsers = createAction('[User/API] Load Users', props<{ users: User[] }>());
