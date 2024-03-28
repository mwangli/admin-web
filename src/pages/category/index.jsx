import {connect} from 'dva';
import {Table, Button, Divider, message, Badge} from 'antd';

function Category({dispatch, data, loading}) {

  function deleteHandler(id) {
    dispatch({
      type: 'category/remove',
      payload: id,
    });
    message.success("删除成功")
  }

  function editHandler(id, values) {
    dispatch({
      type: 'category/modify',
      payload: {id, values},
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
      title: '分类状态',
      dataIndex: 'categoryStatus',
      key: 'categoryStatus',
      render: record => <Badge status={record.status === 1 ? 'processing' : 'warning'}
                               text={record.status === 1 ? '可用' : '禁用'}/>
    },
    {
      title: '操作',
      key: 'operation',
      render: (record) => <div>
        {/*<Link to='/product/edit'>*/}
        <a>编辑</a>
        {/*</Link>*/}
        <Divider type="vertical"/>
        <a onClick={deleteHandler.bind(null, record.id)}>删除</a>
      </div>
    },
  ];
  const pagination = {
    // pageSize:10
  };
  return (
    <div>
      <Button type="primary">新增分类</Button>
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
  const {data} = state.category;
  return {
    data,
    loading: state.loading.models.category,
  };
}

export default connect(mapStateToProps)(Category);
