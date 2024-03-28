import {Component} from 'react';
import {Modal, Form, Input} from 'antd';

const FormItem = Form.Item;

class ModalForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isEdit: props.isEdit,
    };
  }

  showModalHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const {onOk} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values)
        onOk(values);
        this.hideModelHandler();
        this.props.form.resetFields();
      }

    });
  };

  render() {
    const {children, columns, record} = this.props;
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return (
      <span>
        <span onClick={this.showModalHandler}>
          {children}
        </span>
        <Modal
          title="编辑页面"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          okText={"确认"}
          cancelText={"取消"}
        >
          <Form horizontal="true" onSubmit={this.okHandler}>
            {

              columns.filter(i => i.key !== "operation" && i.key !== "id")
                .map(item => <FormItem
                  {...formItemLayout}
                  label={item.title}
                >
                  {
                    getFieldDecorator(item.key, {
                      dataType: item.dataType,
                      initialValue: this.state.isEdit ?
                        Object.entries(record)
                          .filter((k,v)=>k=='pageSize')
                          .map((k, v) => k+v).join(',') :
                        '',
                    })(<Input/>)
                  }
                </FormItem>)}
            {/* <FormItem
              {...formItemLayout}
              label="标题"
            >
              {
                getFieldDecorator('title', {
                  initialValue: title,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="颜色"
            >
              {
                getFieldDecorator('color', {
                  initialValue: color,
                })(<Input />)
              }
            </FormItem> */}
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ModalForm);
