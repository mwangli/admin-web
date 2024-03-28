import { connect } from 'dva';
import { Table, Divider, message, Tooltip } from 'antd';
import ModalForm from '../../../components/ModalForm'
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
    debugger;
    dispatch({
      type: 'order/modify',
      payload: { id, values },
    });
  }

  function getOldOrders(id) {
    debugger
    dispatch({
      type: 'order/getOldOrders',
    });
  }

  function deliveryHandler(id,values) {
    dispatch({
      type: 'order/delivery',
      payload: { id, values },
    });
  }
  const editColumns = [
    {
      label: '快递单号',
      dataIndex: 'logistics'
    }
  ];
  const columns = [
    {
      title: '商品',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',

    },
    {
      title: '买家',
      dataIndex: 'customerId',
      key: 'customerId',
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
      title: '操作',
      key: 'operation',
      render: (record) =>
        <div>
          <DrawerInfo />
          <Divider type="vertical" />
          <ModalForm
            record={record}
            columns={editColumns}
            onOk={deliveryHandler.bind(this, record.id)}
          >
            <a>发货</a>
          </ModalForm>
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
