import React from 'react';
import { Layout, Menu} from 'antd';



const { Header, Content, Footer } = Layout;

class LayoutMain extends React.Component {
 

  render(){
            const logged_out_nav = (
              <Layout className="layout">
              <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1" onClick={() => this.props.display_form('login')}>Login</Menu.Item>
                  <Menu.Item key="2" onClick={() => this.props.display_form('signup')}>Signup</Menu.Item>
                </Menu>
              </Header>
              <Content style={{ padding: '0 50px' }}>
                {this.props.children}
              </Content>
              </Layout>
            );
          
            const logged_in_nav = (
              <Layout>
              <Header>
              <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                  <Menu.Item key="1" onClick={this.props.handle_logout}>Logout</Menu.Item>
                  <Menu.Item key="2" onClick={() => this.props.display_form('articles')}>Articles</Menu.Item>
                  <Menu.Item key="3" onClick={() => this.props.display_form('upload')}>Upload</Menu.Item>
                </Menu>
              </Header>
              <Content style={{ padding: '0 50px' }}>
                {this.props.children}
              </Content>
              </Layout>
            );
      return (<div>{this.props.logged_in ? logged_in_nav : logged_out_nav}</div>);
          
      }
}
 


export default LayoutMain;