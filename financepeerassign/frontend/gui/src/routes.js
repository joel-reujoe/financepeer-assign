import React from 'react';
import { Route } from 'react-router-dom';
import ArticleList from './containers/ArticleList';
import Login from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = ()=>(
    <div>
        <Route exact path="/" render={(props)=><ArticleList {...props}/>}/>
        <Route exact path="/login/" render={(props)=><Login onLogin={props.onLogin}/>} />
        <Route exact path="/signup/" render={(props)=><Signup {...props}/>}/>
    </div>
);

export default BaseRouter;