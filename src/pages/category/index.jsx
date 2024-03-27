import { connect } from 'dva';
import { Table, Button, Divider,message } from 'antd';

function Category({ dispatch, data, loading }) {

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

  function getOldOrders() {
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',

    },
    {
      title: '描述',
      dataIndex: 'desription',
      key: 'description',

    },
    {
      title: '操作',
      key: 'operation',
      render: (record) =>
        <Button type="primary" size="small" ghost="true" icon ="gift"
        onClick={deliveryHandler.bind(null, record.id)}>发货</Button>

    },
  ];
  const pagination = {
    pageSize:5
  };
  return (
    <div>
      <Button type="primary" onClick={getOldOrders.bind(null,null)}>历史订单</Button>
      <Table
        pagination={pagination}
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey={record => record.id}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { data } = state.category;
  return {
    data,
    loading: state.loading.models.category,
  };
}

export default connect(mapStateToProps)(Category);
