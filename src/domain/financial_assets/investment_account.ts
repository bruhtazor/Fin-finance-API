import { PositionItem } from "../position.ts";
import { BankAccount, AccountJson } from "./bank_account.ts";
import { AccountType } from "../../shared/enums/account_enums.ts";
import { TransactionCategory, TransactionType } from "../../shared/enums/transaction_enums.ts";
import { TransactionItem } from "../transaction.ts";

export type InvestmentAccJson = AccountJson & {
    value: number;
    positions: PositionItem[];
    valueHistory: Array<Record<string, number>>;
};

export class InvestementAccount extends BankAccount {

    private value: number;
    private positions: PositionItem[];
    private valueHistory: Array<Record<string, number>>;

    public constructor(
        name: string,
        currency: string,
        amount: number,
        creationDate: string,
        bank: string,
        fees: number,
        id?: string
    ) {
        super(name, currency, amount, creationDate, bank, fees, id);
        this.value = 0;
        this.positions = [];
        this.valueHistory = [];
    }

    public override accountType(): AccountType {
        return AccountType.INVESTMENT_ACCOUNT;
    }

    public override toJson(): InvestmentAccJson {
        return {
            ...super.toJson(),
            valueHistory: this.valueHistory,
            value: this.value,
            positions: this.positions
        };
    }

    /* TODO: (later) should maybe treat this as a transaction and not an income since 
     investement account only holds assets and not cash*/
    public override newTransaction(
        type: string,
        date: string,
        quantity: number,
        fees: number,
        title: string = "New transaction",
        assetId?: string,
        buyPrice?: number
    ): void {
        this.transactions.push(
            new TransactionItem(
                title,
                type,
                TransactionCategory.STOCKS,
                date,
                quantity,
                fees,
                assetId,
                buyPrice
            ));

        if (!assetId) {
            throw new Error("assetId required for investment transactions");
        };

        if (!buyPrice) {
            throw new Error("buyPrice required for investment transactions");
        };

        const positionAmount = quantity * buyPrice;
        const entry = this.positions.find(position => position.assetId === assetId);
        if (type == TransactionType.INCOME) {
            this.amount += positionAmount;

            if (!entry) {
                const position: PositionItem = {
                    assetId: assetId,
                    quantity: quantity,
                    amount: positionAmount
                }
                this.positions.push(position);
            } else {
                entry.quantity += quantity;
                entry.amount += positionAmount;
            };
        } else {
            if (!entry) {
                throw new Error("position doesn't exist");
            } else {
                this.amount -= positionAmount;
                let posQty = entry.quantity;
                const avgBuyPrice = entry.amount / posQty;
                posQty -= quantity;
                if (posQty <= 0) {
                    const idx = this.positions.findIndex(
                        position => position.assetId === assetId
                    )
                    this.positions.splice(idx, 1)
                } else {
                    entry.quantity -= quantity;
                    entry.amount -= quantity * avgBuyPrice
                }
            }
        }
    }
}

