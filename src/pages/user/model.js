import {request} from '../../utils/request';

export default {
  namespace: 'user',
  state: {
    data: [],
  },
  reducers: {
    save(state, {payload: data}) {
      return {...state, data};
    },
  },
  effects: {
    * listUser({}, {put}) {
      const data = yield request('/api/user/list', {method: 'POST', body: {}});
      yield put({type: 'save', payload: data});
    },

    * create({payload: values}, {put}) {
      yield request(`/api/user/save`, {method: 'POST', body: values})
      yield put({type: 'list'});
    },

    * modify({payload: {id, values}}, {put}) {
      yield request(`/api/user/save`, {method: 'PUT', body: values})
      yield put({type: 'list'});
    },

    * remove({payload: id}, {put}) {
      yield request(`/api/user/delete`, {method: 'DELETE', body: [id]});
      yield put({type: 'list'});
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(
        ({pathname}) => {
          if (pathname === '/user') {
            dispatch({type: 'listUser'});
          }
        });
    },
  },
}
