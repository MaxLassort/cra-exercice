import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CraComponent} from './cra.component';
import {provideStore, Store} from "@ngrx/store";
import {userReducer} from "../../../state/users/user.reducer";
import {provideAnimations} from "@angular/platform-browser/animations";
import {User} from "../../models/user";
import {of} from "rxjs";

describe('CraComponent', () => {
  let component: CraComponent;
  let fixture: ComponentFixture<CraComponent>;
  let store: Store;

  const mockUsers: User[] = [
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
      id: "2", name: 'User 2', times: {dayWorkedSaved: new Set(), vacationDays: new Set()},
      username: ''
    }
  ];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraComponent],
      providers: [
        provideStore({
          users: userReducer
        }),
        provideAnimations()
      ]
    })
      .compileComponents();
    store = TestBed.inject(Store);
    spyOn(store, 'select').and.returnValue(of(mockUsers))
    fixture = TestBed.createComponent(CraComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
    component.daysToUpdate = new Set<string>(["2024-01-10T23:00:00.000Z"])
    component.activeUser = {
      id: "1",
      name: "Alice Smith",
      username: "",
      times: {
        vacationDays: new Set<string>(["2024-03-10T23:00:00.000Z"]),
        dayWorkedSaved: new Set<string>(["2024-03-18T23:00:00.000Z"]),
      }
    }


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add class to calendar', () => {


    component.daysToUpdate = new Set<string>(["2024-01-10T23:00:00.000Z"])

    const worked = component.dateClass(new Date("2024-03-18T23:00:00.000Z"));
    const vacation = component.dateClass(new Date("2024-03-10T23:00:00.000Z"));
    const daysToUpdate = component.dateClass(new Date("2024-01-10T23:00:00.000Z"));
    component.calendar()?.updateTodaysDate();
    expect(worked).toBe('worked');
    expect(vacation).toBe('vacation');
    expect(daysToUpdate).toBe('toSave');
  });

  it('should select the date from the calendar and update the component\'s attributes', () => {
    let firstEvent = new Date("Tue Mar 26 2024 00:00:00 GMT+0100");
    component.selectDates(firstEvent);
    // inside vacations set
    let secondEvent = new Date("2024-03-18T23:00:00.000Z")
    component.selectDates(secondEvent);

    expect(component.daysToUpdate.has(firstEvent.toISOString())).toBeTruthy();
    expect(component.activeUser?.times.vacationDays.has(firstEvent.toISOString())).toBeFalsy();
  });
  it('should update the worked days', () => {
    component.radioValue = component.radioValues[0];
    //on ajoute une valeur à toSave
    let dateMock = new Date("2024-01-01T23:00:00.000Z")
    component.daysToUpdate.add(dateMock.toISOString())
    component.saveDays()
    expect(component.activeUser?.times.dayWorkedSaved.has(dateMock.toISOString())).toBeTruthy()
  });
  it('should update the vacation days', () => {
    component.radioValue = component.radioValues[1];
    //on ajoute une valeur à toSave
    let dateMock = new Date("2024-01-01T23:00:00.000Z")
    component.daysToUpdate.add(dateMock.toISOString())
    component.saveDays()
    expect(component.activeUser?.times.vacationDays.has(dateMock.toISOString())).toBeTruthy()
  });
  it('should update the active agent', () => {
    // Simuler la sélection des utilisateurs depuis le store
    component.changeCurrentAgent(mockUsers[1]);
    expect(component.activeUser?.id).toBe("2")

  });
});
