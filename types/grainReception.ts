export interface GrainReceptionReqBodyType {
    productId: number;
    vehicleId: number;
    contrId: number;
    typeId: number;
    userId: number;
    combineId: number;
    partnerId: number;
    district: string;
    name: string;
    regions: string;
    truckNumber: string;
    shipmentNumber: string;
    receptionNumber: string;
    combinePaperNumber: string;
    totalWeight: number;
  }
  
export interface GrainReceptionItem {
    id: number;
    district: string;
    name: string;
    regions: string | null;
    truckNumber: string;
    shipmentNumber: string;
    receptionNumber: string;
    combinePaperNumber: string;
    totalWeight: number;
    createdAt: string;
    updatedAt: string | null;
  }
  
  export interface GrainReceptionResponse {
    status: string;
    data: GrainReceptionItem[];
    elements: number;
    pages: number;
  }

  export interface GrainReceptionData {
    productId: number;
    vehicleId: number;
    contrId: number;
    typeId: number;
    userId: number;
    combineId: number;
    partnerId: number;
    id: number;
    district: string;
    name: string;
    regions: string | null;
    truckNumber: string;
    shipmentNumber: string;
    receptionNumber: string;
    combinePaperNumber: string;
    totalWeight: number;
    createdAt: string; // ISO format datetime
    updatedAt: string | null;
  }
  

  export interface GrainReceptionsResponse {
    status: string;
    data: GrainReceptionData[];
    elements: number;
    pages: number;
  }
  
  export interface GrainReception{
    id: number;
    district: string;
    name: string;
    regions: string | null;
    truckNumber: string;
    shipmentNumber: string;
    receptionNumber: string;
    combinePaperNumber: string;
    totalWeight: number;
    createdAt: string;
    updatedAt: string | null;
  }
  

  export interface SingleGrainReceptionResponse {
    status: string;
    data: GrainReceptionData;
  }
  
  export interface SingleGrainReception {
    id: number;
    district: string;
    name: string;
    regions: string | null;
    truckNumber: string;
    shipmentNumber: string;
    receptionNumber: string;
    combinePaperNumber: string;
    totalWeight: number;
    createdAt: string;
    updatedAt: string | null;
  }

  export interface GrainUpdateResponse {
    message: string;
    status: string;
  }
  
  export interface DeleteGrainReceptionResponse{
    message: string;
    status: string;
  }
  