import React from 'react'
import Form, { FormItem, FormCore } from 'noform';
//import { Button } from 'noform';
import { Button } from 'antd';
const Input = ({ value = '', status }) => { // Mock Dumb Component Input
    if (status === 'edit') {
        return <input value={value} />
    } else {
        return `presenting preview val: ${value}`
    }
};
export default class QuickStart extends React.Component {

    componentWillMount () { // initialized FormCore
        const opt = {
            age: 0
        }
        window.core = this.core = new FormCore(opt);
    }
    setValue = () => {
        const agenum = this.core.getValue('age');
        this.core.setValue('age', parseInt(agenum || 0) + 1);
    }
      
    setStatus = () => {
        const agestatus = this.core.getStatus('age');
        this.core.setStatus('age', agestatus === 'edit' ? 'preview' : 'edit' );
    }
    render() {
        return (
            <div>
                <Form core={this.core}>
                    <FormItem name="username" label="username"><Input /></FormItem>
                    <FormItem label="">
                        <div>
                            <Button style={{ marginRight: 8 }} onClick={this.setValue}>plus 1</Button>
                            <Button onClick={this.setStatus}>toggle status</Button>
                        </div>
                    </FormItem>
                </Form>
            </div>
        );
    }
}