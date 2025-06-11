export interface CreatePartnerData {
  name: string;
  partnerType: string;
  categoryId: number | null;
  bankList: { bankName: string; mfo: string; accountNumber: string }[];
  inn: string;
  currencyType: ("USD" | "EUR" | "UZS")[];
  contact_info: {
    fio?: string;
    phone?: string;
    email?: string;
  };
}

export interface CategoryDto {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface BankDto {
  id: number;
  inn: string | null;
  bankName: string;
  accountNumber: string;
  mfo: string;
  createdAt: string;
  updatedAt: string | null;
  parentName: string | null;
}

export interface ContactInfo {
  fio: string;
  email: string;
  phone: string;
}

export interface Partner {
  id?: any;
  name?: string;
  partnerType?: "LEASING_COMPANY" | "BANK" | "FARM";
  createdAt?: string;
  updatedAt?: string | null;
  inn?: string;
  currencyType?: string[];
  categoryDto?: CategoryDto;
  bankDto?: BankDto[];
  contact_info?: ContactInfo;
  region?: string;
  district?: string;
  org?: string;
  org_id?: any;
  districtDto?: {
    createdAt: string;
    id: number;
    name: string;
    region: string;
    updatedAt: string | null;
  }[];
}

export interface PartnersResponse {
  data: Partner[];
}

export interface GetPartners {
  createdAt: string;
  id: number;
  name: string;
  partnerType: string;
  updatedAt?: any;
  currencyType?: string;
  categoryDto?: {
    id?: any;
    name?: string;
  };
}

export interface PartnerParams {
  type: string;
  page: number;
  size: number;
  from: string | undefined;
  to: string | undefined;
  dateTime: string | undefined;
}

export interface GetPartnerById {
  status: string;
  data: PartnerById;
}

export interface PartnerById {
  id: number;
  name: string;
  partnerType: string;
  createdAt: string;
  updatedAt: any;
  inn: string;
  bankDto: [];
  currencyType: ("USD" | "EUR" | "UZS")[];
  categoryDto: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  contact_info: {
    fio: string;
    email: string;
    phone: string;
  };
}

// organizations

export interface CreateDistrict {
  region?: any;
  district?: string;
  name?: string;
  id?: any;
}
