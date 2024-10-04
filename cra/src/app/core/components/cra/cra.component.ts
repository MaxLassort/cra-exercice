import {Component, OnInit, Signal, viewChild} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";

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
import {setUser, usersActions} from "../../../state/users/user.action";


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
    MatOption,
    JsonPipe
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

  displayError:boolean = false;


  dateClass = (date: Date): string => {

    if (this.activeUser?.times.dayWorkedSaved.has(date.toISOString())) {
      return 'worked'
    }
    if (this.activeUser?.times.vacationDays.has(date.toISOString())) {
      return 'vacation'
    }
    if (this.daysToUpdate.has(date.toISOString()) && this.activeUser) {
      return 'toSave'
    }
    return '';
  };


  calendar: Signal<MatCalendar<any> | undefined> = viewChild('calendar');

  constructor(private store: Store<AppState>) {
    this.users$ = this.store.select(selectAllUsers);
    this.users = toSignal(this.users$, {initialValue: []});

  }

  /**
   * Fonction appelée lorsqu'une date est sélectionnée dans le calendrier
   * @param event - La date sélectionnée
   */
  selectDates(event: any) {
    const dateString = event.toISOString();
    if (this.daysToUpdate.has(dateString) || this.activeUser?.times.vacationDays.has(dateString) || this.activeUser?.times.dayWorkedSaved.has(dateString)) {
      this.daysToUpdate.delete(dateString);
      this.activeUser?.times.vacationDays.delete(dateString);
      this.activeUser?.times.dayWorkedSaved.delete(dateString);
    } else {
      this.daysToUpdate.add(event.toISOString())
    }
    this.calendar()?.updateTodaysDate();
  }

  /**
   * Fonction appelée pour sauvegarder les jours sélectionnés (travaillés ou congés)
   */
  saveDays() {
    this.displayError = false
    if(this.activeUser){
      if (this.activeUser?.times.vacationDays.size + this.daysToUpdate.size >= 8 && this.radioValue === this.radioValues[1]) {
        this.displayError = true;
        return
      }
      let time: Times = {
        ...this.activeUser?.times
      };
      let toSave: string[] = [...this.daysToUpdate.values()];
      const updatedUser:User = {
        ...this.activeUser,
        times: {...time}
      };
      // save to mission
      if (this.radioValue == this.radioValues[0]) {
        updatedUser.times.dayWorkedSaved = new Set([...this.activeUser?.times.dayWorkedSaved, ...toSave])
      } else {
        updatedUser.times.vacationDays = new Set([...this.activeUser?.times.vacationDays, ...toSave])
      }
        this.store.dispatch(setUser({user: updatedUser}))
        this.calendar()?.updateTodaysDate();
        this.changeAgent(updatedUser)
      }
  }
  /**
   * Fonction appelée lors du changement d'utilisateur (agent) dans la sélection ou de l'actualisation d'un utilisateur et nettoie le cache daysToUpdate
   * @param event - L'ID de l'utilisateur sélectionné
   */
  changeAgent(event: any) {
    this.activeUser = event
    this.daysToUpdate.clear();
    this.calendar()?.updateTodaysDate();
  }



}
