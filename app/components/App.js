import React from 'react';

class App extends React.Component {
  render() {
    return (
      <section>
        {this.props.children}
      </section>
    );
  }
}

export default App;
