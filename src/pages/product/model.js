import {request} from '@/utils/request';

export default {
  namespace: 'product',
  state: {
    data: [],
  },
  reducers: {
    setData(state, {payload: data}) {
      return {...state, data};
    },
  },
  effects: {
    * listProduct({}, {put}) {
      const {data} = yield request(`/api/product/list`, {method: 'POST', body: {}});
      yield put({type: 'setData', payload: data});
    },

    * save({payload: values}, {put}) {
      yield request(`/api/product/save`, {method: 'POST', body: values})
      yield put({type: 'list'});
    },

    * delete({payload: id}, {put}) {
      yield request(`/api/product/delete`, {method: 'DELETE', body: [id]});
      yield put({type: 'list'});
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(
        ({pathname}) => {
          if (pathname === '/product') {
            dispatch({type: 'listProduct'});
          }
        });


    },
  },
}
