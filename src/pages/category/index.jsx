import {connect} from 'dva';
import {Table, Button, Divider, message, Badge} from 'antd';
import ModalForm from "@/components/ModalForm";

function Category({dispatch, data, loading}) {

  function deleteHandler(id) {
    dispatch({
      type: 'category/remove',
      payload: id,
    });
    message.success("删除成功")
  }

  function createHandler(id, values) {
    dispatch({
      type: 'category/create',
      payload: {id, values},
    });
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
        <ModalForm isEdit={true}
                   record={record}
                   columns={columns}
                   onOk={editHandler.bind(null, record.id)
                   }>
          <a>编辑</a>
        </ModalForm>
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
      <ModalForm
        // record={{}}
        columns={columns}
        onOk={createHandler}
      >
        <Button type="primary">新增分类</Button>
      </ModalForm>
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
