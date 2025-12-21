import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      name: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      name: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      name: 'Ford',
      model: 'Focus',
    },
  ];

  findAll() {
    return this.cars;
  }

  findById(id: string) {
    const carExists = this.cars.find((car) => car.id === id);
    if (!carExists) throw new NotFoundException(`Car with id ${id} not found`);
    return carExists;
  }
}
