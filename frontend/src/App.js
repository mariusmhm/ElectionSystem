import React, { Component } from 'react';


class App extends Component {
constructor (props){
    super(props);
    this.state={
    group:"Gruppe 5"

    }
}
  render() {
    return (

      <div className="App">

        <h1 style= {{color:"red", textAlign:"center"}}> Hello World!</h1>
           <h2 style={{color:"red"}}> This is a test! </h2>

      </div>
    );
  }
}

export default App;

