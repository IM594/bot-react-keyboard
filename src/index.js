import React, { Component } from "react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

class App extends Component {
  state = {
    layoutName: "default",
    input: "",
  };

  onChange = (input) => {
    this.setState({
      input: input,
    });
    console.log("Input changed", input);
  };

  onKeyPress = (button) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default",
    });
  };

  onChangeInput = (event) => {
    let input = event.target.value;
    this.setState(
      {
        input: input,
      },
      () => {
        this.keyboard.setInput(input);
      }
    );
  };

  render() {
    return (
      <div>
        <input
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={(e) => this.onChangeInput(e)}
        />
        <Keyboard
          keyboardRef={(r) => (this.keyboard = r)}
          onChange={(input) => this.onChange(input)}
          onKeyPress={(button) => this.onKeyPress(button)}
          theme={"hg-theme-default hg-layout-default myTheme"}
          layoutName={this.state.layoutName}
          layout={{
            default: [
              // "` 1 2 3 4 5 6 7 8 9 0 ",
              "q w e r t y u i o p {bksp}",
              "a s d f g h j k l {mic}",
              "{shift} z x c v b n m {enter}",
              "@ {space}",
            ],
            shift: [
              // "~ ! @ # $ % ^ & * ( ) _ +",
              "Q W E R T Y U I O P {bksp}",
              "A S D F G H J K L {mic}",
              "{shift} Z X C V B N M {enter}",
              "@ {space}",
            ],
          }}
          display={{
            "{bksp}": "⌫", // 退格键
            "{mic}": "🎤",
            "{enter}": "↵", // 回车键
            "{shift}": "⇧", // Shift 键
            "{tab}": "⇥", // Tab 键
            "{lock}": "⇪", // Caps Lock 键
            "{space}": "␣", // 空格键
          }}
          buttonTheme={[
            {
              class: "hg-blue",
              buttons: "{enter} {bksp} {mic}",
              // buttons: "{bksp} {enter} {shift} {tab} {lock} {space} @"
            },
            {
              class: "hg-grey",
              buttons: "{bksp} {mic}",
              // buttons: "{bksp} {enter} {shift} {tab} {lock} {space} @"
            },
            // {
            //   class: "hg-highlight",
            //   buttons: "Q q",
            // },
          ]}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
