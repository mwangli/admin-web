import { request } from '../../utils/request';

export default {
  namespace: 'category',
  state: {
    data: [],
  },
  reducers: {
    save(state, { payload: data }) {
      return { ...state, data };
    },
  },
  effects: {
    * list({ }, { put }) {
      const data = yield request('http://localhost:8080/category', { method: 'GET' });
      yield put({ type: 'save', payload: data });
    },

    * create({ payload: values }, { put }) {
      yield request(`/api/category`, { method: 'POST', body: values })
      yield put({ type: 'list' });
    },

    * modify({ payload: { id, values } }, { put }) {
      yield request(`/api/category/${id}`, { method: 'PUT', body: values })
      yield put({ type: 'list' });
    },

    * remove({ payload: id }, { put }) {
      yield request(`/api/order/${id}`, { method: 'DELETE' });
      yield put({ type: 'list' });
    },

    * getOldOrders({ }, { put }) {
      const data = yield request('/api/category/old', { method: 'GET' });
      yield put({ type: 'save', payload: data });
    },

    * delivery({ payload: id }, { put }) {
      const data = yield request(`/api/order/delivery/${id}`, { method: 'POST' });
      yield put({ type: 'list' });
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(
        ({ pathname }) => {
          if (pathname === '/category') {
            dispatch({ type: 'list' });
          }
        });
    },
  },
}
