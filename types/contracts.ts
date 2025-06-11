export interface CreateContract {
  maxPenalty: number;
  cronMaxRate?: number;
  penaltyState: string;
  categoryId?: number;
  partnerIds: number[];
  number?: string;
  financingAmount?: number;
  interestRate?: number;
  penaltyRate?: number;
  contractDate: any;
  startDate: any;
  endDate: any;
  terms: string;
  balance: number;
  currencyType: string;
  files: File[];
  payDate?: number;
  contractType: string;
  userId: any;
  gracePeriod?: any;
  contractNumber?: string;
  status?: any;
  mainContractId?: any;
  standardId?: any;
  ordinaryContractNumber?: string;
  financialDirection?: any;
  hasChangePaidDay?: any;
  changeBackDay?: any;
}

export interface GotMainCont {
  id: number;
  number: number;
  partnersDto: Array<{
    id: any;
    name: string;
  }>;
  attachments?: any;
}

export interface CreateMainContract {
  userId: any;
  number: string;
  categoryId: number;
  status: string;
  currencyType: string;
  contractType: "MAIN" | "STANDARD";
  contractDate: string; // ISO format: YYYY-MM-DDTHH:mm:ss.sssZ
  startDate: string; // ISO format: YYYY-MM-DDTHH:mm:ss.sssZ
  endDate: string; // ISO format: YYYY-MM-DDTHH:mm:ss.sssZ
  files: File[]; // Fayllar ro‘yxati
  partnerId: number;
  financialDirection?: any;
}

export interface GotContractData {
  penaltyState: string;
  contractDate: string;
  createdAt: string;
  endDate: string;
  financingAmount: number;
  id: string;
  interestRate: number;
  number: string;
  penaltyRate: number;
  startDate: string;
  status: string;
  terms: string;
  updatedAt: string | null;
  categoryDto: any;
  partnersDto: any;
  paths: any;
  balance: number;
  currencyType: string;
  attachments: any[];
  originName: string;
  cronMaxRate: number;
  contractType: string;
  gracePeriod: number;
  forMonths: number;
  payDate: number;
  interestAmount: number;
  hasOrdinary: boolean;
  remainBalance?: number;
  penaltyAmount?: number;
}

export interface EditingContract {
  cronMaxRate?: number | undefined;
  penaltyState?: string;
  categoryId?: number;
  partnerIds?: number[];
  number?: string;
  financingAmount?: number;
  interestRate?: number;
  penaltyRate?: number;
  balance?: number;
  currencyType?: string;
  contractDate?: any;
  startDate?: any;
  endDate?: any;
  terms?: string;
  gracePeriod?: number;
  contractType?: string;
  payDate?: number;
  status?: any;
}

export interface MonitoringContract {
  monthNumber: number;
  totalBalance: number;
  monthlyBalance: number;
  monthlyInterestBalance: number;
  startDate: string;
  endDate: string;
}

export interface ContractFiles {
  files: File[];
}

export interface DeleteFile {
  contractId: number;
  fileId: any;
}

export interface AttachmentsTypes {
  cloudPath?: string;
  contentType?: string;
  createdDate?: string;
  id?: number;
  originName?: string;
  size?: number;
  type?: any;
  updatedDate?: any;
}
