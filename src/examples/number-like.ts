import { TraitSubtract } from '../built-in-traits/arithmetic/trait-subtract/trait-subtract';
import { TraitSqrt } from '../built-in-traits/arithmetic/math/trait-sqrt/trait-sqrt';
import { TraitNegate } from '../built-in-traits/arithmetic/trait-negate/trait-negate';
import { TraitMultiply } from '../built-in-traits/arithmetic/trait-multiply/trait-multiply';
import { TraitDivide } from '../built-in-traits/arithmetic/trait-divide/trait-divide';
import { createReference, ctf } from '../built-in-traits/others/trait-as/trait-as-functions';
import { TraitToString } from '../built-in-traits/others/trait-to-string/trait-to-string';
import { TraitAs } from '../built-in-traits/others/trait-as/trait-as';
import { TraitAdd } from '../built-in-traits/arithmetic/trait-add/trait-add';
import { Impl } from '../core/traits/implementation-decorator';
import { AssembleTraitImplementations } from '../core/traits/assemble-trait-implementations';


export interface INumberStruct {
  value: number;
}



/** FOR NUMBER STRUCT **/

@Impl()
export class ImplTraitAsForNumberStruct<GSelf extends INumberStruct> extends TraitAs<GSelf> {
}

@Impl()
export class ImplTraitToStringForNumberStruct<GSelf extends INumberStruct> extends TraitToString<GSelf> {
  toString(this: GSelf): string {
    return this.value.toString(10);
  }
}

@Impl()
export class ImplTraitNegateForNumberStruct<GSelf extends INumberStruct> extends TraitNegate<GSelf, INumberStruct> {
  negate(this: GSelf): INumberStruct {
    return { value: -this.value };
  }
}

@Impl()
export class ImplTraitAddForNumberStruct<GSelf extends INumberStruct> extends TraitAdd<GSelf, INumberStruct, INumberStruct> {
  add(this: GSelf, value: INumberStruct): INumberStruct {
    return { value: this.value + value.value };
  }
}

@Impl()
export class ImplTraitSubtractForNumberStruct<GSelf extends INumberStruct> extends TraitSubtract<GSelf, INumberStruct, INumberStruct> {
  subtract(this: GSelf, value: INumberStruct): INumberStruct {
    return { value: this.value - value.value };
  }
}

// export type TImplTraitSubtractUsingAddAndNegateForNumberStructGSelfConstraint<GSelf> = INumberStruct
//   & TraitAdd<GSelf, GSelf, GSelf>;
//
// export type TImplTraitSubtractUsingAddAndNegateForNumberStructGValue<GSelf extends TraitAdd<GSelf, GSelf, GSelf>> = INumberStruct
//   & TraitNegate<INumberStruct, TInferTraitAddGValue<GSelf>>;
//
// @Impl()
// export class ImplTraitSubtractUsingAddAndNegateForNumberStruct<GSelf extends TImplTraitSubtractUsingAddAndNegateForNumberStructGSelfConstraint<GSelf>> extends TraitSubtractUsingAddAndNegate<GSelf, TImplTraitSubtractUsingAddAndNegateForNumberStructGValue<GSelf>> {
// }


@Impl()
export class ImplTraitMultiplyForNumberStruct<GSelf extends INumberStruct> extends TraitMultiply<GSelf, INumberStruct, INumberStruct> {
  multiply(this: GSelf, value: INumberStruct): INumberStruct {
    return { value: this.value * value.value };
  }
}

@Impl()
export class ImplTraitDivideForNumberStruct<GSelf extends INumberStruct> extends TraitDivide<GSelf, INumberStruct, INumberStruct> {
  divide(this: GSelf, value: INumberStruct): INumberStruct {
    return { value: this.value / value.value };
  }
}

@Impl()
export class ImplTraitSqrtForNumberStruct<GSelf extends INumberStruct> extends TraitSqrt<GSelf, INumberStruct> {
  sqrt(this: GSelf): INumberStruct {
    return { value: Math.sqrt(this.value) };
  }
}

/** FOR NUMBER **/

@Impl()
export class ImplTraitNegateForNumber<GSelf extends INumber> extends TraitNegate<GSelf, INumber> {
  negate(this: GSelf): INumber {
    return new NumberLike(-this.value);
  }
}

@Impl()
export class ImplTraitAddForNumber<GSelf extends INumber> extends TraitAdd<GSelf, INumberStruct, INumber> {
  add(this: GSelf, value: INumberStruct): INumber {
    return new NumberLike(this.value + value.value);
  }
}

@Impl()
export class ImplTraitSubtractForNumber<GSelf extends INumber> extends TraitSubtract<GSelf, INumberStruct, INumber> {
  subtract(this: GSelf, value: INumberStruct): INumber {
    return new NumberLike(this.value - value.value);
  }
}

@Impl()
export class ImplTraitMultiplyForNumber<GSelf extends INumber> extends TraitMultiply<GSelf, INumberStruct, INumber> {
  multiply(this: GSelf, value: INumberStruct): INumber {
    return new NumberLike(this.value * value.value);
  }
}

@Impl()
export class ImplTraitDivideForNumber<GSelf extends INumber> extends TraitDivide<GSelf, INumberStruct, INumber> {
  divide(this: GSelf, value: INumberStruct): INumber {
    return new NumberLike(this.value / value.value);
  }
}

@Impl()
export class ImplTraitSqrtForNumber<GSelf extends INumber> extends TraitSqrt<GSelf, INumber> {
  sqrt(this: GSelf): INumber {
    return new NumberLike(Math.sqrt(this.value));
  }
}


export interface INumber extends INumberStruct,
  ImplTraitAsForNumberStruct<INumber>,
  ImplTraitToStringForNumberStruct<INumber>,
  ImplTraitNegateForNumber<INumber>,
  ImplTraitAddForNumber<INumber>,
  ImplTraitSubtractForNumber<INumber>,
  ImplTraitMultiplyForNumber<INumber>,
  ImplTraitSqrtForNumber<INumber>
{}

export interface IAssembledNumberImplementations {
  new(): INumber;
}

export const NumberImplementationsCollection = [
  ImplTraitAsForNumberStruct,
  ImplTraitToStringForNumberStruct,
  ImplTraitNegateForNumber,
  ImplTraitAddForNumber,
  ImplTraitSubtractForNumber,
  // ImplTraitSubtractUsingAddAndNegateForNumber,
  ImplTraitMultiplyForNumber,
  ImplTraitSqrtForNumber,
];

const AssembledNumberImplementations = AssembleTraitImplementations<IAssembledNumberImplementations>(NumberImplementationsCollection);

export class NumberLike extends AssembledNumberImplementations implements INumber {
  static from(input: INumberStruct): INumber {
    return new NumberLike(input.value);
  }

  static ref(input: INumberStruct): INumber {
    const result = new NumberLike(input.value);
    createReference(input, result);
    return result;
  }

  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}

/*-----*/

export class SuperNumber extends NumberLike {
  superParam: any;
  constructor(value: number | NumberLike) {
    super((typeof value === 'number') ? value : value.value);
    this.superParam = 'abc';
  }
}

/*-----*/

export async function debugTraitNumberLike() {

  const num1 = new NumberLike(1);
  const num2 = new NumberLike(10);
  console.log(num1.toString());
  console.log(num1.add(num2).negate().toString());
  console.log(num1.add({ value: 20 }).negate().toString());
  console.log(num1.subtract(num2).negate().toString());
  console.log(num1.multiply(num2).sqrt().toString());
  console.log(num1.as(ctf(SuperNumber)));

  const num3 = num1.as(NumberLike.ref);
  console.log(num1.value, num3.value);
  num1.value = 2;
  console.log(num1.value, num3.value);
  num3.value = 5;
  console.log(num1.value, num3.value);
}

