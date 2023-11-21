import 'reflect-metadata';
import { Type, plainToInstance } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

class B {
  label!: string;
}

class C {
  @Type(() => B)
  props!: B;
}

class A extends PartialType(C) {
  @Type(() => B)
  inner!: B;
}

const a = plainToInstance(A, {
  inner: { label: 'inner' },
  props: { label: 'props' },
});

console.log('should be true', a instanceof A); // true
console.log('should be true', a.inner instanceof B); // true
console.log('should be true', a.props instanceof B); // false -> Should be true
