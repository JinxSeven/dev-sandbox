export interface UserDetails {
    name: string;
    email: string;
    income: number;
    expense: number;
    balance: number;
    transactionCount: number;
    goalCount: number;
}

export interface UserTransactions {
    transactions: Transacts[]
}

export interface Transacts {
    id: number;
    userId: number;
    transactionType: string;
    amount: number;
    category: string;
    dateTime: string;
}

export interface UserDash {
    email: string;
    username: string;
    income: number;
    expense: number;
    transactions: Transaction[];
    goals: Goal[];
}

export interface Transaction {
    type: string;
    amount: number;
    date: string;
    category: string;
}

export interface Goal {
    name: string;
    target: number;
    contribution: number;
}
