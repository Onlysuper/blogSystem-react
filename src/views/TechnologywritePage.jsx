import React from 'react';
import {Form, Input, Button, DatePicker} from 'antd';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';  
// import '../style/CodeMirror.css';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const FormItem = Form.Item;
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
    handleChange(editor, data, value) {
      let _data = Object.assign({},this.state.formdata,{articleContent:value})
    　this.setState({
       formdata: _data
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
          <CodeMirror
            value='<h1>I ♥ react-codemirror2</h1>'
            options={{
              mode: 'xml',
              theme: 'material',
              lineNumbers: true
            }}
            onChange={this.handleChange}
          />
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
function TechnologywritePage(){
    return (
    <div><WrappedHorizontalLoginForm /></div>
    )
}
export default TechnologywritePage