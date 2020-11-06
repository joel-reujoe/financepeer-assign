import { Form, Input, Button, Spin } from 'antd';
import { Component } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const antIcon = <Spin type="loading" style={{ fontSize: 24 }}></Spin>
class Login extends Component
{

   

    onFinish = (values) => {
        this.props.onAuth(values.username,values.password);
        this.props.history.push("/");
    };
    render()
    {
        let errorMessage = null;
        if(this.props.error)
        {
            errorMessage = (
            <p>{this.props.error.message}</p>
            );
        }
        return (
            <div>
                {errorMessage}
                {
                    this.props.loading 
                    ?
                <Spin indicator={antIcon}></Spin>
                :
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
                    <Input />
                  </Form.Item>
            
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item >
                    <Button onClick={this.props.onLogin} type="primary" htmlType="submit" >
                      Submit
                    </Button>
                    Or <NavLink style={{marginRight: '10px'}} to='/signup/'>register now!</NavLink>
                  </Form.Item>
                </Form>
                }
            </div>
        );
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
export default connect(mapStateToProps,mapDispatchToProps)(Login);