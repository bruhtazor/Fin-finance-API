import { v4 as uuid4 } from "uuid";
import { AccountType } from "../../shared/enums/account_enums.ts";

export type AccountObjJson = {
    name: string;
    currency: string;
    amount: number;
    creationDate: string;
    id: string;
}

export abstract class AccountObj {

    protected name: string;
    protected currency: string;
    protected amount: number;
    protected creationDate: string;
    protected id: string;

    public constructor(
        name: string,
        currency: string,
        amount: number,
        creationDate: string,
        id?: string | null
    ) {
        this.name = name;
        this.currency = currency;
        this.amount = amount;
        this.creationDate = creationDate;
        this.id = id ? id : uuid4();
    }

    public abstract accountType(): AccountType

    public toJson(): AccountObjJson {
        return {
            name: this.name,
            currency: this.currency,
            amount: this.amount,
            creationDate: this.creationDate,
            id: this.id
        }
    }
}