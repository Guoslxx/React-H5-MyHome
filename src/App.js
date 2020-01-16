import React from 'react';
import './App.css';
import bg from './assets/img/heka-h5-bg.jpg';


/**
此刻
伴随着新年钟声的敲响
新的一年
幸福开启
真诚向您道一声
谢谢
祝您新的一年工作顺利 
 */
class App extends React.Component {

  state = {
    displayText: 'asdf'
  }

  render() {
    const { displayText } = this.state;
    return (
      <div className="App" >
        <main className="app-container" >
          <img src={bg} alt="bg" />
          <div className="text-show-container">{displayText}</div>
        </main>
        <div className="app-tabs">
          <textarea
            onInput={(e) => { this.handleInput(e) }}
            cols="30"
            rows="2">
          </textarea>
        </div>
      </div>
    );
  }

  handleInput(e) {
    this.setState({
      displayText: e.target.value
    })
  }
}

export default App;
