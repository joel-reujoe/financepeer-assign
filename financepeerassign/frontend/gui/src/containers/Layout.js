import React from 'react';
import { Layout, Menu} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


const { Header, Content, Footer } = Layout;

class LayoutMain extends React.Component {
 
  state = {
    isAuthenticated:false
  }

  componentDidMount()
  {
    const token = localStorage.getItem("token");
    if(!token)
    {
      this.props.history.push('/login');
    }
    else{
      this.setState({
        isAuthenticated:true
      })
      this.props.history.push('/')
    }
  }

  logout = ()=>{
    localStorage.removeItem("token");
    this.setState({
      isAuthenticated:false
    })
    this.props.history.push('/login')
  }
  render(){

        return ( 
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <div className="logo" />
              {
                this.state.isAuthenticated ?

                (<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1" onClick={this.logout}>Logout</Menu.Item>
                  <Menu.Item key="2">Articles</Menu.Item>
                  <Menu.Item key="3">Upload</Menu.Item>
                </Menu>
                ):
                (<Menu theme="dark"></Menu>)
              }
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
              
              <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                {this.props.children}
              </div>
            </Content>
          </Layout>
         );
      }
}
 
const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(actions.logout()) 
  }
}

export default withRouter(connect(null, mapDispatchToProps)(LayoutMain));