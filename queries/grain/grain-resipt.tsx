import {
  getAllGrainResiptAllRegionsdata,
  getAllGrainResiptByDistrict,
  getAllGrainResiptByDistrictName,
  getAllGrainResiptByFarmName,
  getAllGrainResiptByRegion,
  getAllGrainResiptByRegionName,
} from "@/api/grain/grain-resipt";
import { useQuery } from "react-query";

// get grain resipts by region
export const useGrainResiptsListByRegion = (
  page: number,
  size: number,
  region: any
) =>
  useQuery({
    queryKey: ["getGrainResipt", page, size, region],
    queryFn: () => getAllGrainResiptByRegion(page, size, region),
  });

// get grain resipts by district
export const useGrainResiptsListByDistrict = (
  page: number,
  size: number,
  district: any
) =>
  useQuery({
    queryKey: ["getGrainResipt", page, size, district],
    queryFn: () => getAllGrainResiptByDistrict(page, size, district),
  });

// get grain resipts by farmName
export const useGrainResiptsListByFarmName = (
  page: number,
  size: number,
  farmName: any
) =>
  useQuery({
    queryKey: ["getGrainResipt", page, size, farmName],
    queryFn: () => getAllGrainResiptByFarmName(page, size, farmName),
  });

// get grain resipts list for all regions
export const useGrainResiptsListAllRegion = () =>
  useQuery({
    queryKey: ["getGrainResiptAllRegions"],
    queryFn: () => getAllGrainResiptAllRegionsdata(),
  });

// get grain resipts list by region
export const useGrainResiptsListByRegionName = (region: any) =>
  useQuery({
    queryKey: ["getGrainResipt", region],
    queryFn: () => getAllGrainResiptByRegionName(region),
  });

// get grain resipts list by district name
export const useGrainResiptsListByDistrictName = (districtName: any) =>
  useQuery({
    queryKey: ["getGrainResipt", districtName],
    queryFn: () => getAllGrainResiptByDistrictName(districtName),
  });
