import React from 'react';
import './App.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Layout, Menu, Icon ,Form, Input, Button, DatePicker} from 'antd';
import { object } from 'prop-types';
const FormItem = Form.Item;
const { Header, Sider, Content } = Layout;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { text: '' } 
    this.state = { 
    formdata: {
      articleContent:''
    } } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleChange(value) {
    let data = Object.assign({},this.state.formdata,{articleContent:value})
  　this.setState({
     formdata: data
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const articleDate = fieldsValue['articleDate'].format('YYYY-MM-DD');
        const articletitle = fieldsValue['articletitle'];
        const sendData = {articleDate,articletitle,...this.state.formdata}
        console.log(sendData);
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const articletitleError = isFieldTouched('articletitle') && getFieldError('articletitle');
    const articleDateError = isFieldTouched('articletitle') && getFieldError('articletitle');
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={articletitleError ? 'error' : ''}
          help={articletitleError || ''}
          label="标题"
        >
          {getFieldDecorator('articletitle', {
            rules: [{ required: true, message: '请填写文章标题!' }],
          })(
            <Input placeholder="请填写文章标题" />
          )}
        </FormItem>
        <FormItem
         validateStatus={articleDateError ? 'error' : ''}
         help={articleDateError || ''}
          {...formItemLayout}
          label="日期"
        >
          {getFieldDecorator('articleDate', {
            rules: [{ required: true, message: '请选择日期!' }],
          })(
            <DatePicker placeholder="请选择日期"/>
          )}
        </FormItem>
          <ReactQuill onChange={this.handleChange} />
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            发布
          </Button>
        </FormItem>
      </Form>
    );
  }
}


const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {} // You can also pass a Quill Delta here
  }
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render(){
    return (
      <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
             <div>
             <WrappedHorizontalLoginForm />
             
             </div>
            </Content>
          </Layout>
        </Layout>
    );
  }
}

export default App;
