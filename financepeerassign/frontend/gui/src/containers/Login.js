import { Form, Input, Button, Spin } from 'antd';
import { Component } from 'react';


const antIcon = <Spin type="loading" style={{ fontSize: 24 }}></Spin>
class Login extends Component
{
    state = {
      username: '',
      password: ''
    };

    handleChange=(e)=>{
      const name = e.target.name;
      const value = e.target.value;
      this.setState(prevstate => {
        const newState = { ...prevstate };
        newState[name] = value;
        return newState;
      });
    }

    render()
    {
        
        return (
            <div>
                {
                <Form
                    onFinish ={this.onFinish}
                    name="basic"
                    initialValues={{ remember: true }}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    
                  >
                    <Input name="username" onChange={this.handleChange} />
                  </Form.Item>
            
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    
                  >
                    <Input.Password name="password" onChange={this.handleChange} />
                  </Form.Item>
                  <Form.Item >
                    <Button onClick={(e)=>{this.props.handle_login(e,this.state)}} type="primary" htmlType="submit" >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
                }
            </div>
        );
    }
}


export default Login;