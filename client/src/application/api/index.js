import { GET_PAGINATED_CLOTHES, POST_CLOTHES } from './endpoints';
import { axiosGet, axiosPost } from './utils';
import { DEFAULT_PAGINATION_COUNT } from '../constants';
import testClothes from './test-data/clothes.json';

let tempClothes = [...testClothes];

const delay = (data, time = 500) => new Promise((resolve) => setTimeout(() => resolve(data), time));
export const getPaginatedClothes = (options) => {
  const { page = 0, count = DEFAULT_PAGINATION_COUNT } = options;
  const start = page * count;
  const testResult = {
    data: tempClothes.slice(start, start + count),
    page,
    count,
    total: tempClothes.length,
  };
  return delay(testResult);
  // return axiosGet(GET_PAGINATED_CLOTHES, options);
};

export const postNewClothes = (data) => {
  const newClothes = {
    id: `clothes${tempClothes.length+1}`,
    ownerId: 'me',
    name: data.name,
    description: data.description,
  };
  tempClothes.unshift(newClothes);
  return delay({
    data: newClothes,
  });
  // return axiosPost(POST_CLOTHES, data);
};
