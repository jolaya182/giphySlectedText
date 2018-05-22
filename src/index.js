import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import Yes from "./Yes";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <Hello name="CodeSandbox" />
    <h2>Giphy Tool Tip Demo {"\u2728"}</h2>
    <Yes color="red" />
  </div>
);

render(<App />, document.getElementById("root"));
