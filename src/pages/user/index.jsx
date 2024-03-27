import { connect } from 'dva';
import { Table, Button, Divider,Avatar,message } from 'antd';

import ModalForm from '../../components/ModalForm';

function Author({ dispatch, data, loading }) {

  function deleteHandler(id) {
    dispatch({
      type: 'author/remove',
      payload: id,
    });
    message.success("删除成功")
  }

  function editHandler(id, values) {
    dispatch({
      type: 'author/modify',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'author/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: '头像',
      key: 'avator',
      render: record => <Avatar src={JSON.parse(record.openUserInfo).avatarUrl} />
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',

    },
    {
      title: '操作',
      key: 'operation',
      render: (record) => (
        <div>
          <ModalForm record={record} onOk={editHandler.bind(null, record.id)}>
            <a>编辑</a>
          </ModalForm>
          <Divider type="vertical" />
          <a onClick={deleteHandler.bind(null, record.id)}>删除</a>
        </div>
      ),
    },
  ];
  return (
    <div>
      <ModalForm
      record={{}}
      onOk={createHandler}
      >
        <Button type="primary">添加作者</Button>
      </ModalForm>
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
  const { data } = state.user;
  return {
    data,
    loading: state.loading.models.user,
  };
}

export default connect(mapStateToProps)(Author);
