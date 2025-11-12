import { BankAccount, AccountJson } from "./bank_account.ts";
import { AccountType } from "../../shared/enums/account_enums.ts";

export type SavingsJson = AccountJson & {
    interestRate: number
}

export class SavingsAccount extends BankAccount {

    private interestRate: number;

    constructor(
        name: string,
        currency: string,
        amount: number,
        creationDate: string,
        bank: string,
        fees: number,
        interestRate: number,
        id?: string
    ) {
        super(name, currency, amount, creationDate, bank, fees, id)
        this.interestRate = interestRate
    }

    public override accountType(): AccountType {
        return AccountType.SAVINGS_ACCOUNT
    }

    public override toJson(): SavingsJson {
        return {
            ...super.toJson(),
            interestRate: this.interestRate
        }
    }

    // TODO: yearly interest
    public applyYearlyInterest() {

    }
}