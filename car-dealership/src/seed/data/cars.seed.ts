import { v4 as uuid } from 'uuid';
import { Car } from 'src/cars/interfaces/car.interface';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    name: 'Tesla',
    model: 'Model S',
  },
  {
    id: uuid(),
    name: 'BMW',
    model: 'X5',
  },
  {
    id: uuid(),
    name: 'Audi',
    model: 'A6',
  },
];
