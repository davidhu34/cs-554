export const getDataActionTypes = (dataName) => ({
  createStart: `CREATE_${dataName}_START`,
  createSuccess: `CREATE_${dataName}_SUCCESS`,
  createError: `CREATE_${dataName}_ERROR`,
  fetchStart: `FETCH_${dataName}_START`,
  fetchSuccess: `FETCH_${dataName}_SUCCESS`,
  fetchError: `FETCH_${dataName}_ERROR`,
  fetchListStart: `FETCH_${dataName}_LIST_START`,
  fetchListSuccess: `FETCH_${dataName}_LIST_SUCCESS`,
  fetchListError: `FETCH_${dataName}_LIST_ERROR`,
  updateStart: `UPDATE_${dataName}_START`,
  updateSuccess: `UPDATE_${dataName}_SUCCESS`,
  updateError: `UPDATE_${dataName}_ERROR`,
  deleteStart: `DELETE_${dataName}_START`,
  deleteSuccess: `DELETE_${dataName}_SUCCESS`,
  deleteError: `DELETE_${dataName}_ERROR`,
});