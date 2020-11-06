import 'antd/dist/antd.css';
import LayoutMain from './containers/Layout';
import { BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';
import { connect } from 'react-redux';
import * as action from './store/actions/auth';
import { Component } from 'react';
import { authCheckState } from './store/actions/auth';

class App extends Component {

  state = {
    isAuthenticated:false
  }

  onLogin = ()=>{
    console.log("here")
    this.setState({
      isAuthenticated:true
    })
  }

  componentDidMount()
  {
    this.props.onTryAutoSign();
  }

  render(){
    return (
      <div>
        <Router>
          <LayoutMain {...this.state}>
            <BaseRouter onLogin = {this.onLogin}/>
          </LayoutMain>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return {
    isAuthenticated: state.token !== null
  }
}
const mapDispatchTOProps = dispatch =>{
  return {
    onTryAutoSign: ()=>{
      dispatch(action.authCheckState())
    }
  }
}
export default connect(mapStateToProps, mapDispatchTOProps)(App);
