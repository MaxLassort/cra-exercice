import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CraComponent} from './cra.component';

import {provideAnimations} from "@angular/platform-browser/animations";
import {User} from "../../models/user";
import {UserStore} from "../../../state/users/user.store";

describe('CraComponent', () => {
  let component: CraComponent;
  let fixture: ComponentFixture<CraComponent>;

  const mockUsers: User[] = [
    {
      id: "1",
      name: "Alice Smith",
      username: "",
      times: {
        vacationDays: new Set<string>(["2024-03-18T23:00:00.000Z"]),
        dayWorkedSaved: new Set<string>(["2024-03-10T23:00:00.000Z"]),
        vacationCountDown: 0
      }
    },
    {
      id: "2", name: 'User 2', times: {
        dayWorkedSaved: new Set(), vacationDays: new Set(),
        vacationCountDown: 0
      },
      username: ''
    }
  ];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraComponent],
      providers: [
        provideAnimations()
      ]
    })
      .compileComponents();
    // store = TestBed.inject(Store);
    // spyOn(store, 'select').and.returnValue(of(mockUsers))
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
        vacationCountDown: 0
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
  it('should set displayErrir to true if vacation days exceed limit', () => {
    component.activeUser = {
      id: "1",
      name: "Alice Smith",
      username: "",
      times: {
        vacationDays: new Set<string>(["2024-03-10T23:00:00.000Z"]),
        dayWorkedSaved: new Set<string>(["2024-03-18T23:00:00.000Z"]),
        vacationCountDown: 5
      }
    }
    component.daysToUpdate = new Set([
      '2024-03-01',
      '2024-03-02',
      '2024-03-03',
      '2024-03-04',
      '2024-03-05',
      '2024-03-06',
      '2024-03-07'
    ]);
    component.radioValue = component.radioValues[1];
    component.saveDays();
    expect(component.displayError).toBeTrue();
  });
  it('should verify that three movies are available', () => {


    const store = TestBed.inject(UserStore);

    expect(store.entities().length).toBe(0);
  });
});
