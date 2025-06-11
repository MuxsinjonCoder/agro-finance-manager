// types.ts
export interface Product {
    id: number;
    name: string;
    createdAt: string | null;
    updatedAt: string | null;
  }
   
  export interface ProductType {
    id:number,
    name: string;
    createdAt:null,
    updatedAt:null
  }
  export interface ProductTypeResponse {
    status: string;
    data: Product[];
    elements: number;
    pages: number;
  }
  export interface ProductResponse {
    status: string;
    data: Product[];
    elements: number;
    pages: number;
  }
  

  export interface CombineNum{
    id:number,
    number:string,
    createdAt: null,
    updatedAt: null
  }
  export interface CombineNumResponse {
    status: string;
    data: CombineNum[];
    elements: number;
    pages: number;
  }
  export interface TransportType {
    id:number,
    name:string,
    createdAt: null,
    updatedAt: null
  }
  export interface TransportTypeResponse {
    status: string;
    data: TransportType[];
    elements: number;
    pages: number;
  }
  
  export interface ContourType {
    id:number,
    name: string,
    createdAt: null,
    updatedAt: null
  }
  export interface ContourTypeResponse {
    status: string;
    data: ContourType[];
    elements: number;
    pages: number;
  }
  
 

  export interface PartnerContactInfo {
    fio: string;
    email: string;
    phone: string;
  }
  
  export interface PartnerBankDto {
    id: number;
    inn: string | null;
    bankName: string;
    accountNumber: string;
    mfo: string;
    createdAt: string;
    updatedAt: string | null;
    parentName: string | null;
  }
  
  export interface PartnerDistrictDto {
    id: number;
    name: string;
    region: string;
    createdAt: string;
    updatedAt: string | null;
  }
  
  export interface PartnerCategoryDto {
    id: number;
    name: string;
    description: string;
    financialDirection: string | null;
    categoryType: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface PartnerDataItem {
    id: number;
    name: string;
    partnerType: string;
    createdAt: string;
    updatedAt: string | null;
    inn: string;
    currencyType: string[];
    categoryDto: PartnerCategoryDto;
    bankDto: PartnerBankDto[];
    districtDto: PartnerDistrictDto[];
    storageLocation: string | null;
    volume: string | null;
    contact_info: PartnerContactInfo;
  }
  
  export interface AllPartnersResponse {
    status: string;
    data: PartnerDataItem[];
    elements: number;
    pages: number;
  }

  export interface PartnerByTypeResponse{
    status: string;
    data: PartnerDataItem[];
    elements: number;
    pages: number;
  }

  export interface  PartnerByIdResponse  {
    status: string;
    data: PartnerDataItem;
  };

  export interface PartnerFilterResponse{
    status:string,
    data:PartnerDataItem[]
    elements:number,
    pages:number
  }


  export interface TransportByIdResponse{
    status:string,
    data:TransportType[]
  }
 
