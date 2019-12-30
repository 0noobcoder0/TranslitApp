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
    var lang = document.cookie;
    fetch("http://146.148.85.67/processWordJSON?inString=" + value + lang)
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
    var valueArray = value.split(/\s+/);
    let suggestions = [];
    this.getSuggestions(valueArray[valueArray.length - 1]);
    this.setState(() => ({ suggestions, text: value }));
  };

  setLanguageCookie = e => {
    document.cookie = "&lang=" + e.target.value;
  };

  getLanguageCookie() {
    var lang = document.cookie.replace("&lang=", "");
    return lang;
  }

  suggestionSelected(value) {
    this.result += value + " ";
    var res = this.result.replace("undefined", "");
    // let res;
    // if (document.getElementById("textbox").getAttribute("value") === null) {
    //   res += value;
    // } else {
    //   res += " " + value;
    // }
    this.setState(() => ({
      text: res,
      suggestions: []
    }));
    document.getElementById("textbox").focus();
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
        <div className="LanguageSelector">
          Select a language!
          <br />
          <br />
          <select
            defaultValue={this.getLanguageCookie()}
            onChange={this.setLanguageCookie}
          >
            <option value="" selected>
              --
            </option>
            <option value="tamil">Tamil</option>
            <option value="hindi">Hindi</option>
            <option value="telugu">Telugu</option>
            <option value="bengali">Bengali</option>
            <option value="gujarati">Gujarati</option>
            <option value="kannada">Kannada</option>
            <option value="malayalam">Malayalam</option>
            <option value="punjabi">Punjabi</option>
          </select>
          <br />
          <hr />
        </div>
        <textarea
          id="textbox"
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
