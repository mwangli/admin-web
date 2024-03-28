import {Badge, Button, Divider, message, Table} from 'antd';
import {connect} from 'dva';
import {Link} from "umi";

function Product({dispatch, data, loading}) {

  function deleteHandler(id) {
    dispatch({
      type: 'product/delete',
      payload: id,
    });
    message.success("删除成功")
  }

  function saveHandler(id, values) {
    dispatch({
      type: 'product/save',
      payload: {id, values},
    });
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '品类',
      dataIndex: 'categoryDesc',
      key: 'categoryDesc',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '规格',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '标签',
      dataIndex: 'favorCount',
      key: 'favorCount',

    },
    {
      title: '状态',
      dataIndex: 'productStatus',
      key: 'productStatus',
      render: record => <Badge status={record.productStatus == 1 ? 'processing' : 'default'}
                               text={record.productStatus == 1 ? '在售' : '已售'}/>
    },
    {
      title: '操作',
      key: 'operation',
      render: (record) => (
        <div>
          <Link to={{
            pathname: '/product/edit',
            state: {record, isEdit: true}
          }}><a>编辑</a></Link>
          <Divider type="vertical"/>
          <a onClick={deleteHandler.bind(null, record.id)}>删除</a>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Link to={'/product/edit'}>
        <Button type={"primary"}>新增商品</Button>
      </Link>
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
  const {data} = state.product;
  return {
    data,
    loading: state.loading.models.product,
  };
}


export default connect(mapStateToProps)(Product);
