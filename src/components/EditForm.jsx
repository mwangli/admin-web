import { Component } from 'react';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Button,
  Upload,
  Icon,
  Input
} from 'antd';

const { Option } = Select;

class Demo extends Component {

  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        debugger
        this.props.saveHandler(values)
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
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} hidden={!this.state.visible}>
        <Form.Item label="添加商品">

        </Form.Item>
        <Form.Item label="作者" hasFeedback>
          {getFieldDecorator('author', {
            rules: [{ required: true, message: '必须填写该商品的作者' }],
          })(
            <Select placeholder="请选择该商品的作者">
              <Option value="china">作者甲</Option>
              <Option value="usa">作者乙</Option>
              <Option value="usa">作者丙</Option>
              <Option value="usa">作者丁</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item label="标签">
          {getFieldDecorator('tag', {
            rules: [
              { required: true, message: '请选择标签', type: 'array' },
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
          {getFieldDecorator('price', { initialValue: 3 })(<InputNumber min={1} max={1000} />)}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator('description', { initialValue: 3 })(<Input />)}
        </Form.Item>
        <Form.Item label="规格">
          {getFieldDecorator('size', { initialValue: 3 })(<Input />)}
        </Form.Item>
        <Form.Item label="状态">
          {getFieldDecorator('switch', { valuePropName: 'checked' })(<Switch />)}
        </Form.Item>
        <Form.Item label="图片">
          {getFieldDecorator('iamges', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或或拖拽文件至此区域进行上传</p>
              <p className="ant-upload-hint">支持单个或多个文件上传</p>
            </Upload.Dragger>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit"  style={{marginRight:60}}> 保存</Button>
          <Button type="primary" htmlType="cancel"> 取消 </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>

        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'validate_other' })(Demo);
