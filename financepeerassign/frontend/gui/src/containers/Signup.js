
import { Component } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';


class Signup extends Component{
    onFinish = (values) => {
        this.props.onAuth(values.username,values.email,values.password, values.confirm);
        this.props.history.push("/");
    };
    render()
    {
        return (
        <Form  onFinish ={this.onFinish}>
            <Form.Item
                name="username"
                label="User Name"
                
                rules={[
                {
                    type: 'string',
                    message: 'The input is not valid text',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                Register
                </Button>
                Or <NavLink style={{marginRight: '10px'}} to='/login/'>Login</NavLink>
            </Form.Item>
        </Form>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);