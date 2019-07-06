import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import SignInPage from './page/auth/SignInPage'
import SignInWithEmailPage from './page/auth/SignInWithEmailPage'
import SignUpWithEmailPage from './page/auth/SignUpWithEmailPage'
import Header from './component/header/Header'
import ArticleListPage from './page/article/ArticleListPage';
import ArticlePage from './page/article/ArticlePage';
import AddArticlePage from './page/article/AddArticlePage';
import BackHeader from './component/header/BackHeader';

class App extends Component {
  render() {
    return (
      <Fragment>
       
        <Switch>
          
          <Route path="/articles/:articleId">
            <BackHeader/>
            <Route path="/articles/:articleId" component={ArticlePage}></Route>
          </Route>

          <Route path="/">
          <Header />
            <Route path="/" exact component={ArticleListPage} />
            <Route path="/sign-in" exact component={SignInPage} />
            <Route path="/sign-in/email" component={SignInWithEmailPage} />
            <Route path="/sign-up/email" component={SignUpWithEmailPage} />
            <Route path="/add-article" component={AddArticlePage} />
          </Route>


        </Switch>
      </Fragment>
    );
  }
}

export default App;
