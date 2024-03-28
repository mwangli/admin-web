import {request} from '../../utils/request';

export default {
  namespace: 'category',
  state: {
    data: [],
  },
  reducers: {
    save(state, {payload: data}) {
      return {...state, data};
    },
  },
  effects: {
    * listCategory({}, {put}) {
      const {data} = yield request('/api/category/list', {method: 'POST', body: {}});
      yield put({type: 'save', payload: data});
    },

    * create({payload: values}, {put}) {
      yield request(`/api/category/save`, {method: 'POST', body: {...values, status: 1}})
      yield put({type: 'listCategory'});
    },

    * modify({payload: {id, values}}, {put}) {
      yield request(`/api/category/save`, {method: 'POST', body: {id, ...values}})
      yield put({type: 'listCategory'});
    },

    * remove({payload: id}, {put}) {
      yield request(`/api/category/delete`, {method: 'DELETE', body: [id]});
      yield put({type: 'listCategory'});
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(
        ({pathname}) => {
          if (pathname === '/category') {
            dispatch({type: 'listCategory'});
          }
        });
    },
  },
}
