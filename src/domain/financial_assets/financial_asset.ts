export class FinancialAsset {

    private name: string;
    private currency: string;
    private price: number;
    private id: string;
    private dividends?: number | null;
    private issuer?: string | null;

    public constructor(
        name: string,
        currency: string,
        price: number,
        id: string,
        dividends?: number | null,
        issuer?: string | null
    ) {
        this.name = name;
        this.currency = currency;
        this.price = price;
        this.id = id;
        this.dividends = dividends;
        this.issuer = issuer;
    }

    public getName(): string {
        return this.name;
    }

    public getCurrency(): string {
        return this.currency;
    }

    public getPrice(): number {
        return this.price;
    }

    public getId(): string {
        return this.id;
    }

    public getDividends(): number | null | undefined {
        return this.dividends;
    }

    public getIssuer(): string | null | undefined {
        return this.issuer;
    }
}
