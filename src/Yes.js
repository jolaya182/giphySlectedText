import React, { Component } from "react";
import "./style.css";

export default class Yes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      selectedGiphy: "-"
    };
    this.selected = this.selected.bind(this);
    this.clear = this.clear.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
  }

  getRandomInt(min, max) {
    let r = Math.random();
    return Math.floor(r * (max - min + 1)) + min;
  }

  selected() {
    // document.getElementById("cool").remove();
    if (window.getSelection().toString()) {
      //set the variables I will be using so that  we can position the css box
      let top = 0;
      let left = 0;
      let center = 0;
      //get the string from the selected text
      let currString = window.getSelection().toString();
      currString = currString.trim();
      //account when user selects non alpha numeric characters;
      // let r = /^[a-z0-9]+$/i;
      // if (!currString.match(r)){
      //   currString = "try again";
      //   alert("please select whole words and alpha numeric characters");
      //   }
      //get these values and store in these variables so that we can refer to it later
      let t = this;
      let getRandomInt = this.getRandomInt;
      // make the api call to giphy
      fetch(
        "https://api.giphy.com/v1/gifs/search?q=" +
          currString +
          "&api_key=4Z15yuylYr1bEQkpJiBb3dd4ffvUfs5v&limit=25"
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          let w = window.getSelection();
          // get a random number and use it to select a giph from the response
          let num = getRandomInt(0, json.data.length - 1);
          let gif = json.data[num].images.fixed_height_small.url;
          let wid = json.data[num].images.fixed_height_small.width;
          let hei = 110 + 10; // the height + padding + offset
          gif = gif.replace("https", "http");
          let r = w.getRangeAt(0);
          let rects = r.getBoundingClientRect();
          //get the position of the selected text
          top = rects.top;
          left = rects.left;
          center = wid / 2;
          // center the css box
          let newX = left - center;
          let newY = top - 42 - 100; // height,  offset
          //get the div we want to displace
          let n = document.getElementById("cool");
          let greenTriangle = document.getElementById("cool2");
          let whiteTriangle = document.getElementById("cool3");

          // set the displacement
          n.setAttribute(
            "style",
            "position:absolute; top:" + newY + "px; left:" + newX + "px"
          );
          greenTriangle.setAttribute(
            "style",
            "position:absolute; top:" + hei + "px; left:" + center + "px"
          );
          center = center + 3;
          whiteTriangle.setAttribute(
            "style",
            "position:absolute; top:" + hei + "px; left:" + center + "px"
          );

          // update the state values
          t.setState({ isSelected: true, selectedGiphy: gif });
        });
    } else {
      let n = document.getElementById("cool");
      n.setAttribute("style", "");
      this.setState({ isSelected: false, selectedGiphy: "-" });
    }
  }

  clear() {
    // reset the value so that they wont get rendered
    let n = document.getElementById("cool");
    n.setAttribute("style", "");
    this.setState({ isSelected: false, selectedGiphy: "-" });
  }

  render() {
    let { data } = this.state;
    let box = this.state.isSelected ? "box" : "";
    let greenTriangle = this.state.isSelected ? "greenTriangle " : "";
    let whiteTriangle = this.state.isSelected ? "whiteTriangle " : "";
    let { selectedGiphy } = this.state;

    return (
      <div>
        <div className="bigBox" id="bigBox" onClick={this.clear} />

        <div className="littleBox" id="t" onMouseUp={this.selected}>
          <div className={box} id="cool">
            <div className={greenTriangle} id="cool2" />
            <div className={whiteTriangle} id="cool3" />
            {selectedGiphy === "-" ? (
              ""
            ) : (
              <img alt="Giphy" id="innerGif" src={selectedGiphy} />
            )}
          </div>
          Just select text and get GIFs! {data}
          <br />
          <br />
          Cats 🐱, Dogs 🐶, and unicorns 🦄 !
        </div>

        <div className="bigBox" id="bigBox" onClick={this.clear} />
      </div>
    );
  }
}
//build a tool tip using css
