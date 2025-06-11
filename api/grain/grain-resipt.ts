import axiosInstance from "../axios";

// get grain resipts list by  region
export const getAllGrainResiptByRegion = async (
  page: number,
  size: number,
  region: any
) => {
  let url = `/any-desc-grain-reception/getAll?page=${page}&size=${size}`;

  if (region) {
    url += `&region=${region}`;
  }

  const response = await axiosInstance.get(url);
  return response.data;
};

// get grain resipts list by  district
export const getAllGrainResiptByDistrict = async (
  page: number,
  size: number,
  district: any
) => {
  let url = `/any-desc-grain-reception/getAll?page=${page}&size=${size}`;

  if (district) {
    url += `&district=${district}`;
  }

  const response = await axiosInstance.get(url);
  return response.data;
};

// get grain resipts list by  farmName
export const getAllGrainResiptByFarmName = async (
  page: number,
  size: number,
  farmName: any
) => {
  let url = `/any-desc-grain-reception/getAll?page=${page}&size=${size}`;

  if (farmName) {
    url += `&fName=${farmName}`;
  }

  const response = await axiosInstance.get(url);
  return response.data;
};

// get grain resipts list for all regions
export const getAllGrainResiptAllRegionsdata = async () => {
  const response = await axiosInstance.get(
    "/any-desc-grain-reception/getAllByRegion"
  );
  return response.data;
};

// get grain resipts list by  region
export const getAllGrainResiptByRegionName = async (region: any) => {
  const response = await axiosInstance.get(
    `/any-desc-grain-reception/getAllByDistrict?district=${region}`
  );
  return response.data;
};

// get grain resipts list by  region
export const getAllGrainResiptByDistrictName = async (districtName: any) => {
  const response = await axiosInstance.get(
    `/any-desc-grain-reception/getAllByDistrictName?districtName=${districtName}`
  );
  return response.data;
};
