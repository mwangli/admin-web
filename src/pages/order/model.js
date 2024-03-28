import {request} from '../../utils/request';

export default {
  namespace: 'order',
  state: {
    data: [],
  },
  reducers: {
    save(state, {payload: data}) {
      return {data};
    },
  },
  effects: {
    * listNew({}, {put}) {
      const {data} = yield request('/api/order/list', {method: 'POST', body: {status: '0'}});
      yield put({type: 'save', payload: data});
    },
    * listOld({}, {put}) {
      const {data} = yield request('/api/order/list', {method: 'POST', body: {status: '1'}});
      yield put({type: 'save', payload: data});
    },
    * getOrders({}, {put}) {
      const {data} = yield request('/api/order/list', {method: 'POST'});
      console.log(data);
      yield put({type: 'save', payload: data});
    },


    * modify({payload: {id, values}}, {put}) {
      yield request(`/api/order/${id}`, {method: 'PUT', body: values})
      yield put({type: 'list'});
    },

    * remove({payload: id}, {put}) {
      yield request(`/api/order/${id}`, {method: 'DELETE'});
      yield put({type: 'list'});
    },

    * delivery({payload: {id, values}}, {put}) {
      const data = yield request(`/api/order/delivery`, {method: 'POST', body: {id, ...values}});
      yield put({type: 'list'});
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(
        ({pathname}) => {
          if (pathname === '/order/new') {
            dispatch({type: 'listNew'});
          }
          if (pathname === '/order/old') {
            dispatch({type: 'listOld'});
          }
        });
    },
  },
}
