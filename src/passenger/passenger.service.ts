// passenger.service.ts
import { Injectable } from '@nestjs/common';
import { PassengerDTO } from './passenger.dto';

@Injectable()
export class PassengerService {
  private passengers: any[] = [];
  private idCounter = 1;

  /** Add a new passenger (assigns an auto-increment ID). */
  addPassenger(passenger: PassengerDTO) {
    const newPassenger = { id: this.idCounter++, ...passenger };
    this.passengers.push(newPassenger);
    return newPassenger;
  }

  /** Get all passengers. */
  getPassengers() {
    return this.passengers;
  }

  /** Get a passenger by ID. */
  getPassengerById(id: number) {
    return this.passengers.find(p => p.id === id);
  }
}
