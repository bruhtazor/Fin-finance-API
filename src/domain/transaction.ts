import { v4 as uuid4 } from "uuid";
import { TransactionCategory, TransactionType } from "../shared/enums/transaction_enums";

export type TransactionJSON = {
    title: string;
    type: string;
    category: string;
    date: string;
    amount: number;
    fees: number;
    asset_id?: string;
    buy_price?: number;
    id: string;
};

export class TransactionItem {

    private title: string;
    private type: TransactionType;
    private category: TransactionCategory;
    private date: string;
    private amount: number;
    private fees: number;
    private assetId?: string;
    private buyPrice?: number;
    private id: string;

    public constructor(
        title: string | null,
        type: TransactionType | string,
        category: TransactionCategory | string,
        date: string,
        amount: number,
        fees: number,
        assetId?: string,
        buyPrice?: number,
        id?: string | null
    ) {
        this.title = title ?? "New transaction";
        this.type = TransactionItem.toTransactionType(type);
        this.category = TransactionItem.toTransactionCategory(category);
        this.date = date;
        this.amount = amount;
        this.fees = fees;
        this.assetId = assetId;
        this.buyPrice = buyPrice;
        this.id = id ?? uuid4();
    }

    public toJSON(): TransactionJSON {
        const baseData: TransactionJSON = {
            title: this.title,
            type: this.type,
            category: this.category,
            date: this.date,
            amount: this.amount,
            fees: this.fees,
            id: this.id
        };

        if (this.category !== TransactionCategory.BANKING) {
            baseData.asset_id = this.assetId;
            baseData.buy_price = this.buyPrice;
        }

        return baseData;
    }

    private static toTransactionType(type: TransactionType | string): TransactionType {
        if (typeof type !== "string") {
            return type;
        }

        switch (type) {
            case TransactionType.INCOME:
                return TransactionType.INCOME;
            case TransactionType.EXPENSE:
                return TransactionType.EXPENSE;
            case TransactionType.TRANSFER:
                return TransactionType.TRANSFER;
            default:
                throw new Error(`Unknown transaction type: ${type}`);
        }
    }

    private static toTransactionCategory(category: TransactionCategory | string): TransactionCategory {
        if (typeof category !== "string") {
            return category;
        }

        switch (category) {
            case TransactionCategory.BANKING:
                return TransactionCategory.BANKING;
            case TransactionCategory.STOCKS:
                return TransactionCategory.STOCKS;
            case TransactionCategory.CRYPTOS:
                return TransactionCategory.CRYPTOS;
            default:
                throw new Error(`Unknown transaction category: ${category}`);
        }
    }
}
