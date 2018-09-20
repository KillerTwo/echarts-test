import React from 'react'
import './index.css';

export default class Animation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false
        }
    }
    componentDidMount() {
        this.input.addEventListener('focus', this.focus);
        this.input.addEventListener('blur', this.focus);
        console.log("input is : "+this.input);
    }
    focus = () => {
        this.setState({ focused: !this.state.focused })
    }
    render() {
        return (
            <div>
                <input
                    ref={input => this.input = input}
                    className={['input', this.state.focused && 'input-focused'].join(' ')}
                />
            </div>
        );
    }
}