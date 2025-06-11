export interface CreateBankTypes {
    inn?: string;
    bankName?: string;
    accountNumber?: string;
    mfo?: string;
}

export interface GotBankTypes {
    inn: string;
    bankName: string;
    accountNumber: string;
    id: number;
    mfo: string;
}
