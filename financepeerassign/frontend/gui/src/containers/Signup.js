
import { Component } from 'react';
import { Form, Input, Button } from 'antd';


class Signup extends Component{

    state = {
        username: '',
        password: ''
      };
    
    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name)
        this.setState(prevstate => {
          const newState = { ...prevstate };
          newState[name] = value;
          return newState;
        });
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
                    message: 'Please input your username',
                },
                ]}
            >
                <Input name="username" onChange={this.handle_change} />
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
                <Input name="email" onChange={this.handle_change}/>
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
                <Input.Password name="password1" onChange={this.handle_change}/>
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
                <Input.Password name="password2" onChange={this.handle_change}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={(e)=>{this.props.handle_signup(e,this.state)}}>
                Register
                </Button>
            </Form.Item>
        </Form>
        )
    }
}


export default Signup;