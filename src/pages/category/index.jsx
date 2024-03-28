import { connect } from 'dva';
import { Table, Button, Divider,message } from 'antd';

function Category({ dispatch, data, loading }) {

  function deleteHandler(id) {
    dispatch({
      type: 'category/remove',
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
      title: '分类ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',

    },
    {
      title: '分类描述',
      dataIndex: 'description',
      key: 'description',

    },
    {
      title: '操作',
      key: 'operation',
      render: (record) =>
        <Button type="primary" size="small" ghost="true" icon ="gift"
        onClick={deleteHandler.bind(null, record.id)}>删除</Button>
    },
  ];
  const pagination = {
    // pageSize:10
  };
  return (
    <div>
      <Button type="primary" >新增分类</Button>
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
