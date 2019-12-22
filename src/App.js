import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import MainScene from './pages/Main/Scene';
import AppLoading from './pages/AppLoading';

import { loadImg } from './components/ImgLoader/ImgLoader';
import LoadingMusic from './components/LoadingMusic';

class App extends Component {
  state = {
    loading: 0
  }
  componentDidMount() {
    console.time('load')
    loadImg(({ loading }) => {
      this.setState({
        loading: loading
      })
    })
  }

  render() {
    const { loading } = this.state;
    const isLoading = loading >= 100;
    let routerEle = null;
    if (!isLoading) {
      routerEle = (<>
        <Redirect from='/' to='/loading'></Redirect>
        <Route exact path='/loading' render={props => <AppLoading {...props} loading={loading} />}></Route>
      </>)
    } else {
      routerEle = (<>
        <Redirect from='/' to='/loading'></Redirect>
        <Route exact path='/loading' render={props => <AppLoading {...props} loading={loading} />}></Route>
        <Route exact path='/main-secne' component={MainScene}></Route>
      </>)
    }

    return (
      <Router>
        <LoadingMusic />
        <Switch>
          {routerEle}
        </Switch>
      </Router>
    );
  }

}

export default App;
