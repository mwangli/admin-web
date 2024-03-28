import { connect } from 'dva';
import { Table, Button, Divider, message, Tooltip, Drawer } from 'antd';
import DrawerInfo from '../../../components/DrawerInfo'

function Order({ dispatch, data, loading }) {

  function deleteHandler(id) {
    dispatch({
      type: 'order/remove',
      payload: id,
    });
    message.success("删除成功")
  }

  function editHandler(id, values) {
    dispatch({
      type: 'order/modify',
      payload: { id, values },
    });
  }

  function getOldOrers(id) {
    debugger
    dispatch({
      type: 'order/getOldOrders',
    });
  }

  function deliveryHandler(id) {
    dispatch({
      type: 'order/delivery',
    });
  }
  const columns = [
    {
      title: '商品',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: '买家',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',

    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      render: (text) => <Tooltip placement="bottom" title={'好长好长好长好长好长好长好长好长好长好长好长的地址'}>
        <span >地址缩略...</span>
      </Tooltip>
    },
    {
      title: '物流',
      dataIndex: 'logistics',
      key: 'logistics'
    },
    {
      title: '操作',
      key: 'operation',
      render: (record) =>

        <div>
          <DrawerInfo/>
          <Divider type="vertical"/>
          <a>删除</a>
        </div>
    },
  ];
  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey={record => record.id}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { data } = state.order;
  return {
    data,
    loading: state.loading.models.order,
  };
}

export default connect(mapStateToProps)(Order);