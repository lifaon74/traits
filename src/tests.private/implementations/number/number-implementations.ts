import { AddTrait } from '../../../built-in/arithmetic/add/add.trait.js';
import { SubTrait } from '../../../built-in/arithmetic/sub/sub.trait.js';
import { IsEqualTrait } from '../../../built-in/comparison/is-equal/is-equal.trait.js';
import { ValueOfTrait } from '../../../built-in/generic/value-of/value-of.trait.js';
import { NEW } from '../../../built-in/well-known/new/new.constant.js';
import { NewTrait } from '../../../built-in/well-known/new/new.trait.js';
import { callImplementation } from '../../../traits/call-implementation.js';

export interface NumberNewTrait<GOut> extends NewTrait<[value: number], GOut> {}

export abstract class AddImplementationForNumberUsingValueOf<GOut>
  implements AddTrait<ValueOfTrait<number>, GOut>
{
  add(this: NumberNewTrait<GOut> & ValueOfTrait<number>, value: ValueOfTrait<number>): GOut {
    return this[NEW]((this.valueOf() as number) + value.valueOf());
  }
}

export abstract class AddImplementationForNumberUsingValueOfAndNumber<GOut>
  implements AddTrait<number, GOut>
{
  add(this: NumberNewTrait<GOut> & ValueOfTrait<number>, value: number): GOut {
    return this[NEW]((this.valueOf() as number) + value);
  }
}

export abstract class AddImplementationForNumberUsingValueOfOrNumber<GOut>
  implements AddTrait<number, GOut>
{
  add(
    this: NumberNewTrait<GOut> & ValueOfTrait<number>,
    value: number | ValueOfTrait<number>,
  ): GOut {
    if (typeof value === 'number') {
      return callImplementation<AddImplementationForNumberUsingValueOfAndNumber<GOut>, 'add'>(
        AddImplementationForNumberUsingValueOfAndNumber,
        'add',
        this,
        [value],
      );
    } else {
      return callImplementation<AddImplementationForNumberUsingValueOf<GOut>, 'add'>(
        AddImplementationForNumberUsingValueOf,
        'add',
        this,
        [value],
      );
    }
  }
}

export abstract class SubImplementationForNumberUsingValueOf<GOut>
  implements SubTrait<ValueOfTrait<number>, GOut>
{
  sub(this: NumberNewTrait<GOut> & ValueOfTrait<number>, value: ValueOfTrait<number>): GOut {
    return this[NEW]((this.valueOf() as number) - value.valueOf());
  }
}

export abstract class IsEqualImplementationForNumberUsingValueOf
  implements IsEqualTrait<ValueOfTrait<number>>
{
  isEqual(this: ValueOfTrait<number>, value: ValueOfTrait<number>): boolean {
    return this.valueOf() === value.valueOf();
  }
}
