import 'antd/dist/antd.css';
import LayoutMain from './containers/Layout';
import { BrowserRouter as Router} from 'react-router-dom';
import { Component } from 'react';
import Login from './containers/Login';
import Signup from './containers/Signup';
import ArticleList from './containers/ArticleList';
import { Upload } from 'antd';
import Panel from './containers/Panels';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayed_form: localStorage.getItem('token') ? '':'login',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/rest-auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if(json.key)
        {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
        }
        else{
          const keys = Object.keys(json)
          alert(json[keys[0]])
        }
      });
  };
  

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/rest-auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if(json.key)
        {
          localStorage.setItem('token', json.key);
          this.setState({
            logged_in: true,
            displayed_form: ''
          });
        }
        else{
          const keys = Object.keys(json)
          alert(json[keys])
        }
      });
  };

 


  
  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '',displayed_form:'login'});
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render(){
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <Login handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <Signup handle_signup={this.handle_signup} />;
        break;
      case 'upload':
        form = <Panel handle_upload={this.handle_upload}/>
        break;
      default:
        form = <ArticleList/>;
    }
    return (
      <div>
        <Router>
          <LayoutMain
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}>
            {form}
          </LayoutMain>
        </Router>
      </div>
    );
  }
}

export default App;
