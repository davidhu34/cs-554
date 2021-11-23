import { GET_PAGINATED_CLOTHES } from "./endpoints"
import { axiosGet } from "./utils";

import testClothes from './test-data/clothes.json';

export const getPaginatedClothes = (options) => {
  const { page = 0, count = 10 } = options;
  const start = page * count;
  const testResult = testClothes.slice(start, start + count);
  return new Promise((resolve) => setTimeout(() => resolve(testResult), 500));
  // return axiosGet(GET_PAGINATED_CLOTHES, options);
};
