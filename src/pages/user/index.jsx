import {connect} from 'dva';
import {Table, Button, Divider, Avatar, message, Badge} from 'antd';

import ModalForm from '@/components/ModalForm';

function Author({dispatch, data, loading}) {

  function deleteHandler(id) {
    dispatch({
      type: 'user/remove',
      payload: id,
    });
    message.success("删除成功")
  }

  function editHandler(id, values) {
    dispatch({
      type: 'user/modify',
      payload: {id, values},
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'user/create',
      payload: values,
    });
  }

  const columns = [
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
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',

    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '用户状态',
      dataIndex: 'userStatus',
      key: 'userStatus',
      dataType: 'number',
      render: record => <Badge status={record.userStatus === 1 ? 'processing' : 'default'}
                               text={record.userStatus === 1 ? '正常' : '冻结'}/>,
    },
    {
      title: '操作',
      key: 'operation',
      render: (record) => (
        <div>
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
      ),
    },
  ];
  return (
    <div>
      <ModalForm
        // record={{}}
        columns={columns}
        onOk={createHandler}
      >
        <Button type="primary">新增用户</Button>
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
  const {data} = state.user;
  return {
    data,
    loading: state.loading.models.user,
  };
}

export default connect(mapStateToProps)(Author);
