import { describe, expect, test } from '@jest/globals';
import { AddTrait } from '../built-in/arithmetic/add/add.trait.js';
import { ValueOfTrait } from '../built-in/generic/value-of/value-of.trait.js';
import { NEW } from '../built-in/well-known/new/new.constant.js';
import { callImplementation } from '../traits/call-implementation.js';
import { mixin } from '../traits/mixin.js';
import {
  AddImplementationForNumberUsingValueOfOrNumber,
  IsEqualImplementationForNumberUsingValueOf,
  NumberNewTrait,
  SubImplementationForNumberUsingValueOf,
} from './implementations/number/number-implementations.js';

// class NumberGenericImplementation implements GenericTrait {
//   generic<G>(g: G): number {
//     throw 'TODO';
//   }
// }

/*
INFO: isImplemented(instance, trait) feels wrong -> we test if a variable implements a trait which is a pure interface
  Instead we should probably rely on typescript
 */
// export function isImplemented<GImplementation>(
//   instance: any,
//   implementation: abstract new () => GImplementation,
// ) {
//   Object.entries(Object.getOwnPropertyDescriptors(implementation.prototype));
// }

describe('traits', () => {
  describe('with private field', () => {
    class Num
      extends mixin<
        [
          AddImplementationForNumberUsingValueOfOrNumber<Num>,
          SubImplementationForNumberUsingValueOf<Num>,
          IsEqualImplementationForNumberUsingValueOf,
        ]
      >([
        AddImplementationForNumberUsingValueOfOrNumber,
        SubImplementationForNumberUsingValueOf,
        IsEqualImplementationForNumberUsingValueOf,
      ])
      implements NumberNewTrait<Num>, ValueOfTrait<number>
    {
      readonly #value: number;

      constructor(value: number) {
        super();
        this.#value = value;
      }

      [NEW](value: number): Num {
        return new Num(value);
      }

      override valueOf(): number {
        return this.#value;
      }
    }

    test('valueOf', () => {
      expect(new Num(1).valueOf()).toBe(1);
    });

    test('add', () => {
      expect(new Num(1).add(new Num(2)).valueOf()).toBe(3);
    });

    test('sub', () => {
      expect(new Num(1).sub(new Num(2)).valueOf()).toBe(-1);
    });

    test('callImplementation', () => {
      expect(
        callImplementation<SubImplementationForNumberUsingValueOf<Num>, 'sub'>(
          SubImplementationForNumberUsingValueOf,
          'sub',
          new Num(1),
          [new Num(2)],
        ).valueOf(),
      ).toBe(-1);
    });

    test('isEqual', () => {
      expect(new Num(1).isEqual(1)).toBe(true);
    });

    test('function call', () => {
      const _a = (self: AddTrait<Num | number, Num>) => {
        expect(self.add(8).valueOf()).toBe(12);
      };

      _a(new Num(4));
    });
  });
});
