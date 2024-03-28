import {request} from '../../utils/request';

export default {
  namespace: 'order',
  state: {
    data: [],
    pageInfo: {},
  },
  reducers: {
    save(state, {payload: data, pageInfo}) {
      return {data, pageInfo};
    },
  },
  effects: {
    * listOrder({}, {put}) {
      const {data, pageInfo} = yield request('/api/order/list', {method: 'POST', body: {}});
      yield put({type: 'save', payload: data, pageInfo});
    },

    * crate({payload: {id, values}}, {put}) {
      yield request(`/api/order/save`, {method: 'POST', body: values})
      yield put({type: 'list'});
    },

    * modify({payload: {id, values}}, {put}) {
      yield request(`/api/order/save/${id}`, {method: 'PUT', body: values})
      yield put({type: 'list'});
    },

    * remove({payload: id}, {put}) {
      yield request(`/api/order/delete`, {method: 'DELETE', body: [id]});
      yield put({type: 'listOrder'});
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(
        ({pathname}) => {
          if (pathname === '/order') {
            dispatch({type: 'listOrder'});
          }
        });
    },
  },
}
