
export interface User {
  id: string
  name: string
  username: string
  times:Times
}

export interface Times {
  dayWorkedSaved:Set<string>
  vacationDays:Set<string>
}

