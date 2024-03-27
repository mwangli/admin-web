import { request } from '../../utils/request';

export default {
  namespace: 'order',
  state: {
    data: [],
  },
  reducers: {
    save(state, { payload: data }) {
      return { data };
    },
  },
  effects: {
    * listNew({ }, { put }) {
      const data = yield request('/api/order/list', { method: 'GET' });
      yield put({ type: 'save', payload: data });
    },
    * listOld({ }, { put }) {
      const data = yield request('/api/order/old', { method: 'GET' });
      yield put({ type: 'save', payload: data });
    },
    * getOldOrders({ }, { put }) {
      const data = yield request('/api/order/old', { method: 'GET' });
      console.log(data);
      yield put({ type: 'save', payload: data });
    },


    * modify({ payload: { id, values } }, { put }) {
      yield request(`/api/order/${id}`, { method: 'PUT', body: values })
      yield put({ type: 'list' });
    },

    * remove({ payload: id }, { put }) {
      yield request(`/api/order/${id}`, { method: 'DELETE' });
      yield put({ type: 'list' });
    },

    * delivery({ payload: { id, values } }, { put }) {
      const data = yield request(`/api/order/delivery`, { method: 'POST', body: { id, ...values } });
      yield put({ type: 'list' });
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(
        ({ pathname }) => {
          if (pathname === '/api/order/new') {
            dispatch({ type: 'listNew' });
          }
          if (pathname === '/api/order/old') {
            dispatch({ type: 'listOld' });
          }
        });
    },
  },
}
