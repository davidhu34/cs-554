import {
  getDeleteClothesPath,
  GET_PAGINATED_CLOTHES,
  POST_CLOTHES,
  getPutClothesPath,
  SUBSCRIBE_GROUP_TOPIC,
  UNSUBSCRIBE_GROUP_TOPIC,
} from './endpoints';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from './utils';
import { DEFAULT_PAGINATION_LIMIT } from '../constants';
import testClothes from './test-data/clothes.json';

let tempClothes = [...testClothes];

const delay = (data, time = 500) => new Promise((resolve) => setTimeout(() => resolve(data), time));
export const getPaginatedClothes = (options) => {
  const { page = 0, limit = DEFAULT_PAGINATION_LIMIT } = options;
  const skip = page * limit;
  // const testResult = {
  //   data: tempClothes.slice(start, start + limit),
  //   page,
  //   limit,
  //   total: tempClothes.length,
  // };
  // return delay(testResult);
  return axiosGet(GET_PAGINATED_CLOTHES, { params: {skip, limit} });
};

export const postClothes = (data) => {
  const newClothes = {
    id: `clothes${tempClothes.length + 1}`,
    // ownerId: 'me',
    name: data.name,
    description: data.description,
    type: data.type,
  };
  // tempClothes.unshift(newClothes);
  // return delay({
  //   data: newClothes,
  // });
  return axiosPost(POST_CLOTHES,  newClothes);
};

export const putClothes = (id, data) => {
  // let updatingClothes = null;
  // let i = 0;
  // while (i < tempClothes.length && tempClothes[i].id !== id) {
  //   i++;
  // }
  // if (i < tempClothes.length) {
  //   updatingClothes = {
  //     ...tempClothes[i],
  //     ...data,
  //   };
  //   tempClothes[i] = updatingClothes;
  // }
  // return delay({
  //   data: updatingClothes,
  // });
  return axiosPut(getPutClothesPath(id), data);
};

export const deleteClothes = (id) => {
  // let deletedClothes = null;
  // let i = 0;
  // while (i < tempClothes.length && tempClothes[i].id !== id) {
  //   i++;
  // }
  // if (i < tempClothes.length) {
  //   deletedClothes = tempClothes[i];
  //   tempClothes.splice(i, 1);
  // }
  // return delay({
  //   data: deletedClothes,
  // });
  return axiosDelete(getDeleteClothesPath(id));
};

export const getClothes = (id) => {
  let data = null;
  let i = 0;
  while (i < tempClothes.length && tempClothes[i].id !== id) {
    i++;
  }
  if (i < tempClothes.length) {
    data = tempClothes[i];
  }
  return delay({ data });
  // return axiosGet(getClothesPath(id), data);
};

export const subscribeGroupTopic = ({ groupId, token }) => {
  return axiosPost(SUBSCRIBE_GROUP_TOPIC, { groupId, token });
};

export const unsubscribeGroupTopic = ({ groupId, token }) => {
  return axiosPost(UNSUBSCRIBE_GROUP_TOPIC, { groupId, token });
};