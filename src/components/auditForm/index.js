import React from 'react';
import './index.less';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import options from './division';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

const residences = options;

class AuditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            agree: true
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }
    onChange = (value, selectedOptions) => {
        console.log(value);
        console.log("-------------");
        console.log(selectedOptions);
    }
    clickAgreen = (value)=>{
        const isAgree = value.target.checked;
        this.setState({
            agree: !isAgree
        });
        if(isAgree){
            console.log('选中ClickBox',isAgree);
            
        }else{
            console.log('没有选中ClickBox',isAgree);
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                span: 24,
                offset: 0,
                },
                sm: {
                span: 24,
                offset: 0,
                },
            },
        };

        return (
            <Row className="customer-row">
                <Col span={8} offset={8} className="col-class">
                    <Form onSubmit={this.handleSubmit} className="customer-form">
                        <FormItem
                        {...formItemLayout}
                        label="现居住地"
                        >
                        {getFieldDecorator('residence', {
                            initialValue: [],
                            rules: [{ type: 'array', required: true, message: '请输入你的居住地址!' }],
                        })(
                            <Cascader options={residences} onChange={this.onChange} />
                        )}
                        </FormItem>

                        <FormItem
                        {...formItemLayout}
                        label="详细地址"
                        >
                        {getFieldDecorator('address', {
                            initialValue: '',
                            rules: [{required: true, pattern: /^[\u4e00-\u9fa5]+$/, message: '地址为必填项，并且必须是汉字!' }],
                        })(
                            <TextArea rows={2} />
                        )}
                        </FormItem>

                        <FormItem {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox onChange={this.clickAgreen}>我已经阅读 <a href="">同意</a></Checkbox>
                        )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" disabled={this.state.agree}>注册</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        );
    }
}
export default Form.create()(AuditForm);