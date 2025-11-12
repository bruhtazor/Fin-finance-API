import { FinanceObj } from "./finance_obj.ts";

class CryptoExchange extends FinanceObj {

    private exchange: string;
    private fees: number;
    // private transactions: TransactionManager;
    // private valueHistory: Array<ValueData>;

    constructor(name: string, currency: string, amount: number,
        creationDate: string, exchange: string, fees: number, id?: string) {
        super(name, currency, amount, creationDate, id);
        this.exchange = exchange;
        this.fees = fees;
        //this.transactions = []
        //this.valueHistory = []
    }
}