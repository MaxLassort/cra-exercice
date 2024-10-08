


// select the array of users
import {patchState, signalStore, withMethods} from "@ngrx/signals";
import {addEntity, setEntities, setEntity, withEntities} from "@ngrx/signals/entities";
import {User} from "../../core/models/user";



export const UserStore = signalStore(
  { providedIn: 'root' },
  withEntities<User>(),
  withMethods((store) => ({
    addAll(users:User[]):void{
      patchState(store, setEntities(users));
    },
    addUser(user:User): void {
      patchState(store, addEntity(user));
    },
    setUser(user:User){
      patchState(store, setEntity(user));
    }
  })),

);
