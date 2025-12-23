import { v4 as uuid } from 'uuid';
import { Brand } from 'src/brands/entities/brand.entity';

export const BRAND_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'Brand A',
    createdAt: new Date().getDate(),
  },
  {
    id: uuid(),
    name: 'Brand B',
    createdAt: new Date().getDate(),
  },
  {
    id: uuid(),
    name: 'Brand C',
    createdAt: new Date().getDate(),
  },
];
