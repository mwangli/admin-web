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
      yield request(`/api/category`, {method: 'POST', body: values})
      yield put({type: 'list'});
    },

    * modify({payload: {id, values}}, {put}) {
      yield request(`/api/category/${id}`, {method: 'PUT', body: values})
      yield put({type: 'list'});
    },

    * remove({payload: id}, {put}) {
      yield request(`/api/category/delete`, {method: 'DELETE', body:[id]});
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
