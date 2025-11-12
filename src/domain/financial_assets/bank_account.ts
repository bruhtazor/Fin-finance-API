import { AccountObj, AccountObjJson } from "./account_obj.ts";
import { TransactionItem } from "../transaction.ts";
import { TransactionCategory, TransactionType } from "../../shared/enums/transaction_enums.ts";
import { AccountType } from "../../shared/enums/account_enums.ts";

export type AccountJson = AccountObjJson & {
    bank: string;
    fees: number;
    transactions: Array<TransactionItem>;
    amountHistory: Array<Record<string, number>>;
};

export class BankAccount extends AccountObj {

    protected bank: string;
    protected fees: number;
    protected transactions: Array<TransactionItem>;
    private amountHistory: Array<Record<string, number>>;

    public constructor(
        name: string,
        currency: string,
        amount: number,
        creationDate: string,
        bank: string,
        fees: number,
        id?: string | null
    ) {
        super(name, currency, amount, creationDate, id);
        this.bank = bank;
        this.fees = fees;
        this.transactions = []
        this.amountHistory = []
    }

    public accountType(): AccountType {
        return AccountType.BANK_ACCOUNT;
    }

    public override toJson(): AccountJson {
        return {
            ...super.toJson(),
            bank: this.bank,
            fees: this.fees,
            transactions: this.transactions,
            amountHistory: this.amountHistory
        };
    }

    public load(record: TransactionItem) {
        this.transactions.push(Object.assign(this.transactions, record));
    }

    public newTransaction(
        type: string,
        date: string,
        amount: number,
        fees: number,
        title: string = "New transaction"
    ) {
        this.transactions.push(
            new TransactionItem(
                title,
                type,
                TransactionCategory.BANKING,
                date,
                amount,
                fees
            )
        );

        if (type == TransactionType.INCOME) {
            this.amount += amount;
        } else {
            this.amount -= amount;
        }
    }
}
