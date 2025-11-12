from dataclasses import dataclass

from models import Transaction_category, Transaction_type


@dataclass
class TransactionItem:
    """Lightweight representation of a transaction entry."""

    title: str = "New transaction"
    type: str = ""
    date: str = ""
    amount: float = 0.0
    fees: float = 0.0
    asset_id: str | None = None
    buy_price: float | None = None

class Financial_asset():
    # Initialize a financial asset with pricing and dividend data.
    def __init__(self, name: str, currency: str, price: float, id: str, 
                 dividends: float | None = None, issuer: str | None = None):
        self.name = name
        self.currency = currency
        self.price = price
        self.id = id
        self.dividends = dividends
        self.issuer = issuer

class Transaction():
    # Build a transaction record with optional asset metadata.
    def __init__(
        self,
        title: str | None,
        type: str,
        category: str,
        date,
        amount: float,
        fees: float,
        asset_id: str | None = None,
        buy_price: float | None = None,
    ):
        self.title = title or "New transaction"
        self.type = Transaction_type(type)
        self.category = Transaction_category(category)
        self.date = date
        self.amount = amount
        self.fees = fees
        self.asset_id = asset_id
        self.buy_price = buy_price
    
    # Serialize the transaction into a JSON-friendly dictionary.
    def to_json(self):
        base_data = {"title" : self.title,
                     "type" : self.type.value, 
                     "category" : self.category.value, 
                     "date" : self.date,
                     "amount" : self.amount,
                     "fees" : self.fees}
        
        if self.category != Transaction_category.BANKING:
            base_data["asset_id"] = self.asset_id
            base_data["buy_price"] = self.buy_price
        
        return base_data

class Transaction_manager():
    # Prepare containers for persisted and new transactions.
    def __init__(self):
        self.transaction_history = []
        self.new_transactions = []

    # Load an existing transaction into the historical list.
    def load(self, transaction):
        self.transaction_history.append(transaction)

    # Queue a newly created transaction for persistence.
    def add(self, transaction):
        self.new_transactions.append(transaction)

    # Collect both stored and new transactions in JSON format.
    def get_all_transactions(self):
        all = [t.to_json() for t in self.transaction_history]
        new = [t.to_json() for t in self.new_transactions]
        all.extend(new)

        return all

#TODO: find transaction
    # Locate a transaction matching the given criteria.
    def find_transaction(self):
        #finds a specific transaction, need to define which value to search for
        pass

# probably useless since we have the attribute "amount" which is the total amount invested
    # def get_value_invested(self):
    #     value = 0
    #     for t in self.transaction_history:
    #         value += t.amount*t.buy_price
    #     for t in self.new_transactions:
    #         value += t.amount*t.buy_price
    #     return value
