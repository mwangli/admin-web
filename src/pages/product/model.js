import { request } from '../../utils/request';

export default {
  namespace:'product',
  state: {
    data: [],
  },
  reducers: {
    setData(state, { payload: data }) {
      return { ...state, data };
    },
  },
  effects: {
    * list({ }, { put }) {
      const data = yield request(`/api/product`, { method: 'GET' });
      yield put({ type: 'setData', payload: data });
    },

    * save({ payload: values }, { put }) {
      yield request(`/api/product`, { method: 'POST', body: values })
      yield put({ type: 'list' });
    },

    * delete({ payload: id }, { put }) {
      yield request(`/api/product/${id}`, { method: 'DELETE' });
      yield put({ type: 'list' });
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(
        ({ pathname }) => {
          if (pathname === '/product') {
            dispatch({ type: 'list' });
          }
        });
    },
  },
}
