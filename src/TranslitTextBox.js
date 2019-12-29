import React from "react";
import "./TranslitTextBox.css";

export default class TranslitTextBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: ""
    };
  }

  getSuggestions(value) {
    fetch(
      "http://146.148.85.67/processWordJSON?inString=" + value + "&lang=tamil"
    )
      .then(res => res.json())
      .then(json => {
        console.log(json.twords[0].options);
        this.setState({
          suggestions: json.twords[0].options
        });
      });
  }

  onTextChanged = e => {
    const value = e.target.value;
    let suggestions = [];
    this.getSuggestions(value);
    this.setState(() => ({ suggestions, text: value }));
  };

  suggestionSelected(value) {
    this.setState(() => ({
      text: value + " ",
      suggestions: []
    }));
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(item => (
          <li onClick={() => this.suggestionSelected(item)}>{item}</li>
        ))}
      </ul>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <div className="TranslitTextBox">
        <input
          value={text}
          placeholder="Hey there! Enter a word!"
          onInput={this.onTextChanged}
          type="text"
        />
        {this.renderSuggestions()}
      </div>
    );
  }
}
