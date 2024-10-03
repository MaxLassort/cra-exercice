import {Component, OnInit, Signal, viewChild} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";
import {AsyncPipe, NgIf} from "@angular/common";

import {AppState} from "../../../state/app.state";
import {Times, User} from "../../models/user";
import {selectAllUsers} from "../../../state/users/user.selector";
import {toSignal} from "@angular/core/rxjs-interop";
import {MatCard} from "@angular/material/card";
import {
  MatCalendar,
  MatCalendarHeader,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";
import {MatSelect} from "@angular/material/select";
import {usersActions} from "../../../state/users/user.action";


@Component({
  selector: 'app-cra',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MatCard,
    MatCalendar,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatNativeDateModule,
    MatButton,
    MatCalendarHeader,
    MatSlideToggle,
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './cra.component.html',
  styleUrl: './cra.component.css',


})
export class CraComponent {
  users$: Observable<User[]>;
  users: Signal<User[]>
  activeUser: User | undefined;

  // calendar
  maxDate = new Date(2024, 2, 31);
  minDate = new Date(2024, 0, 1);


  //radio
  radioValues: string[] = ['Mission', 'Congés'];
  radioValue: string = this.radioValues[0];

  daysToUpdate: Set<string> = new Set<string>();
  dayWorkedSaved: Set<string> = new Set<string>();
  vacationDays: Set<string> = new Set<string>();


  dateClass = (date: Date): string => {
    if (this.dayWorkedSaved.has(date.toISOString())) {
      return 'worked'
    }
    if (this.vacationDays.has(date.toISOString())) {
      return 'vacation'
    }
    if (this.daysToUpdate.has(date.toISOString())) {
      return 'toSave'
    }
    return '';
  };


  calendar: Signal<MatCalendar<any> | undefined> = viewChild('calendar');

  constructor(private store: Store<AppState>) {
    this.users$ = this.store.select(selectAllUsers);
    this.users = toSignal(this.users$, {initialValue: []});
    this.updateDays();
  }

  /**
   * Fonction appelée lorsqu'une date est sélectionnée dans le calendrier
   * @param event - La date sélectionnée
   */
  selectDates(event: any) {
    const dateString = event.toISOString();
    if (this.daysToUpdate.has(dateString) || this.vacationDays.has(dateString) || this.dayWorkedSaved.has(dateString)) {
      this.daysToUpdate.delete(dateString);
      this.vacationDays.delete(dateString);
      this.dayWorkedSaved.delete(dateString);
    } else {
      this.daysToUpdate.add(event.toISOString())
    }
    this.calendar()?.updateTodaysDate();
  }

  /**
   * Fonction appelée pour sauvegarder les jours sélectionnés (travaillés ou congés)
   */
  saveDays() {
    let toSave: string[] = [...this.daysToUpdate.values()];
    // save to mission
    if (this.radioValue == this.radioValues[0]) {
      this.dayWorkedSaved = new Set([...this.dayWorkedSaved, ...toSave])
    } else {
      this.vacationDays = new Set([...this.vacationDays, ...toSave])
    }
    let time: Times = {
      dayWorkedSaved: this.dayWorkedSaved,
      vacationDays: this.vacationDays
    }
    if (this.activeUser) {
      const updatedUser = {
        ...this.activeUser,
        times: {...time}
      };
      this.store.dispatch(usersActions.updateTimes({user: updatedUser}))
    }
    this.calendar()?.updateTodaysDate();
  }
  /**
   * Fonction appelée lors du changement d'utilisateur (agent) dans la sélection
   * @param event - L'ID de l'utilisateur sélectionné
   */
  changeAgent(event: any) {
    this.activeUser = this.users().find(user => user.id == event)
    this.updateDays();
    this.calendar()?.updateTodaysDate();
  }

  private updateDays() {
    if (this.activeUser) {
      this.dayWorkedSaved = this.activeUser.times.dayWorkedSaved
      this.vacationDays = this.activeUser.times.vacationDays
    }
    this.daysToUpdate = new Set<string>();
  }


}
