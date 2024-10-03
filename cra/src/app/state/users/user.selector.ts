import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromUser from  "./user.reducer";

export const selectUserState = createFeatureSelector<fromUser.UserState>('users');

// Sélecteur pour obtenir tous les utilisateurs


export const selectAllUsers = createSelector(
  selectUserState,
  fromUser.selectAllUsers
);
