import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Product {
  // imported functions are decorator factories, so I have to execute theme via ()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsPositive()
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getInformation() {
    return [this.title, `$${this.price}`];
  }
}