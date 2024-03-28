import {Component} from 'react';
import {Button, Form, Icon, Input, InputNumber, Select, Switch, Upload} from 'antd';
import {connect} from "dva";
import {router} from "umi";

const {Option} = Select;

class Demo extends Component {

  // state = {
  //   visible: true
  // };
  //
  // showDrawer = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };
  //
  // onClose = () => {
  //   this.setState({
  //     visible: false,
  //   });
  // };


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // debugger
        let {state} = this.props.location;
        const record = state ? state.record : {}
        const {dispatch} = this.props;
        dispatch({
          type: 'product/save',
          payload: {...record,...values},
        });
        router.push('/product')
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  render() {
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    let {state} = this.props.location;
    const isEdit = state ? state.isEdit : false
    const record = state ? state.record : {}
    console.log(record)
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="添加商品">

        </Form.Item>
        <Form.Item label="品类" hasFeedback>
          {getFieldDecorator('author', {
            rules: [{required: true, message: '必须填写该商品的作者'}],
          })(
            <Select placeholder="请选择该商品类型" defaultValue={isEdit?record.categoryId:-1}>
              <Option value={0}>品类一</Option>
              <Option value={1}>品类二</Option>
              <Option value={2}>品类三</Option>
              <Option value={3}>品类四</Option>
              <Option value={4}>其他品类</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="名称">
          {getFieldDecorator('name', {initialValue: isEdit ? record.name : ''})(<Input
            min={1} max={1000} width={600}/>)}
        </Form.Item>
        <Form.Item label="标签">
          {getFieldDecorator('tag', {
            rules: [
              {required: true, message: '请选择标签', type: 'array'},
            ],
          })(
            <Select mode="multiple" placeholder="请选择与商品关联的标签">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="价格">
          {getFieldDecorator('price', {initialValue: isEdit ? record.price : ''})(<InputNumber
            min={1} max={1000}/>)}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator('description', {initialValue: isEdit ? record.description : ''})(<Input/>)}
        </Form.Item>
        <Form.Item label="规格">
          {getFieldDecorator('size', {initialValue: isEdit ? record.size : ''})(<Input/>)}
        </Form.Item>
        <Form.Item label="状态">
          {getFieldDecorator('productStatus', {valuePropName: 'productStatus'})(<Switch/>)}
        </Form.Item>
        <Form.Item label="图片">
          {getFieldDecorator('iamges', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <Icon type="inbox"/>
              </p>
              <p className="ant-upload-text">点击或或拖拽文件至此区域进行上传</p>
              <p className="ant-upload-hint">支持单个或多个文件上传</p>
            </Upload.Dragger>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{span: 12, offset: 6}}>
          <Button type="primary" htmlType="submit" style={{marginRight: 60}}> 保存</Button>
          <Button type="primary" htmlType="cancel"> 取消 </Button>
        </Form.Item>
        <Form.Item wrapperCol={{span: 12, offset: 6}}>

        </Form.Item>
      </Form>

    );
  }
}

function mapStateToProps(state) {
  const {data} = state.product;
  return {
    data,
    loading: state.loading.models.product,
  };
}


export default connect(mapStateToProps)(Form.create({name: 'validate_other'})(Demo));
