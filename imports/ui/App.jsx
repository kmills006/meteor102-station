import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

class App extends Component {
  handleSubmit(evt) {
    evt.preventDefault();

    const nameInput = ReactDOM.findDOMNode(this.refs.nameInput);
    const barNameInput = ReactDOM.findDOMNode(this.refs.barNameInput);

    Bars.insert({
      name: nameInput.value,
      bar: barNameInput.value,
    });

    nameInput.value = '';
    barNameInput.value = '';
  }

  renderBarList() {
    const bars = this.props.bars;

    return _.map(bars, bar => <li key={bar._id}>{bar.name}: {bar.bar}</li>);
  }

  render() {
    return (
      <div className="container">
        <h1>What is your favorite bar in Houston?</h1>

        <div className="form">
          <form onSubmit={evt => { this.handleSubmit(evt) }}>
            <label for="name">Name</label>
            <input
              type="text"
              ref="nameInput"
              name="name" />

            <label for="bar-name">Bar Name</label>
            <input
              type="text"
              ref="barNameInput"
              name="bar-name" />

            <input type="submit" />
          </form>
        </div>

        <div className="bar-list">{this.renderBarList()}</div>
      </div>
    );
  }
};

App.propTypes = {
  bars: React.PropTypes.array.isRequired,
};


export default createContainer(() => {
  return {
    bars: Bars.find().fetch(),
  };
}, App);
