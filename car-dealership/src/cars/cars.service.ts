import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

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

  createCar(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(newCar);
    return newCar;
  }

  updateCar(id: string, UpdateCarDto: UpdateCarDto) {
    let carExists = this.findById(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carExists = { ...carExists, ...UpdateCarDto };
        return carExists;
      }
      return car;
    });
    return carExists;
  }

  deleteCar(id: string) {
    this.findById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return { message: `Car with id ${id} deleted successfully` };
  }
}
