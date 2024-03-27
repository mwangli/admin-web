import { request } from '../../utils/request';

export default {
  namespace:'user',
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
      const data = yield request('http://localhost:8080/user', { method: 'GET' });
      yield put({ type: 'save', payload: data });
    },

    * create({ payload: values }, { put }) {
      yield request(`http://localhost:8080/user`, { method: 'POST', body: values })
      yield put({ type: 'list' });
    },

    * modify({ payload: { id, values } }, { put }) {
      yield request(`http://localhost:8080/user/${id}`, { method: 'PUT', body: values })
      yield put({ type: 'list' });
    },

    * remove({ payload: id }, { put }) {
      yield request(`http://localhost:8080/user/${id}`, { method: 'DELETE' });
      yield put({ type: 'list' });
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(
        ({ pathname }) => {
          if (pathname === '/user') {
            dispatch({ type: 'list' });
          }
        });
    },
  },
}
