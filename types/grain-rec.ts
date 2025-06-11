interface GrainData {
    id: number;
    createdAt: string;
    number: string;
    grainType: string;
    tovar: string;
    allWeight: number;
    tara: number;
    realWeight: number;
    physic: number;
    cond: number;
    vehicleNumber: string;
    qaydNumber: string;
    receptionTime: string;
    receptionName: string;
    pknumber: string;
  }
  
 export interface FarmerGrainReceptionRes {
    status: string;
    data: GrainData[];
  }
  

  interface DistrictDataItem {
    id: number;
    shDa: number;
    shTn: number;
    shDay: number;
    shDifferent1: number;
    shDifferent2: number;
    cutting: number;
    createdAt: string;
    btn: number;
    bpercent: number;
    bpenalty: number;
    bsave: number;
    mtn: number;
    mrest: number;
    mpercent: number;
    mpenalty: number;
    msave: number;
  }
  
  export interface DistrictDataRes {
    status: string;
    data: DistrictDataItem[];
  }

  export interface  GrainAcceptanceLaboratory {
    acceptanceDate: string; // ISO format date string
    documentNumber: string;
    completeness: string;
    impurity: number;
    grainMixture: string;
    productType: "GRAIN";
    moisture: number;
    gluten: string;
    physicalWeight: number;
    cropClassId: number;
    vitreousness: number;
    isApproved: boolean;
    cropTypeId: number;
    farmerId: number;
  }

  export interface GrainAcceptanceLaboratoryRes {
    message:string,
    status:string
  }

  export interface AltegDataItem {
    id: number;
    cutting: number;
    createdAt: string;
    bsaving: number;
    mphysic: number;
    mkond: number;
    mdiscount: number;
    mnakidka: number;
    msaving: number;
    bphysic: number;
    bkond: number;
    bdiscount: number;
    bnakidka: number;
    bpenalty: number;
    mpenalty: number;
  }
  
 export interface AltegApiResponse {
    status: "OK" | "ERROR";
    data: AltegDataItem[];
  }




export interface Farmer {
  id: number;
  name: string;
  district: string;
  region: "TASHKENT_CITY" | string;
  inn: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface FarmerApiResponse {
  status: "OK" | "ERROR";
  message?: string;
  data: Farmer;
}