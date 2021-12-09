export const BASE_URL = 'http://localhost:3001';

export const GET_PAGINATED_CLOTHES = '/clothes';
export const POST_CLOTHES = '/clothes';

export const getPutClothesPath = (id) => `/clothes/${id}`;
export const getDeleteClothesPath = (id) => `/clothes/${id}`;
export const getClothesPath = (id) => `/clothes/${id}`;

export const SUBSCRIBE_GROUP_TOPIC = '/messaging/subscribe';
export const UNSUBSCRIBE_GROUP_TOPIC = '/messaging/unsubscribe';