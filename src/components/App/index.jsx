import React from "react";

import Keyboard from "../Keyboard";
import Display from "../Display";

class App extends React.Component {
  INITIAL_STATE = {
    first_number: "0",
    second_number: "",
    operation: "",
    prev: {
      number: "",
      operation: ""
    }
  };

  state = {
    ...this.INITIAL_STATE
  };

  numberKeyHandler = (event) => {
    const symbol = event.target.name;
    const { operation, first_number, second_number } = this.state;

    if (operation) {
      const value = this.updateNumber(second_number, symbol);
      this.setState({ second_number: value });
    } else {
      const value = this.updateNumber(first_number, symbol);
      this.setState({ first_number: value });
    }
  };

  updateNumber(number, symbol) {
    const has_point = number.indexOf(".") > -1 ? true : false;
    const has_zero = number === "0";

    const is_point = symbol === ".";
    const is_zero = symbol === "0";

    if (has_point && is_point) return number;
    if (has_zero && is_zero) return number;
    if (has_zero && !is_point) return symbol;
    if (has_zero && is_point) return "0.";

    return number + symbol;
  }

  operationKeyHandler = (event) => {
    const { second_number } = this.state;
    const operation = event.target.name;

    if (second_number) this.calculate();

    this.setState({ operation });
  };

  serviceKeyHandler = (event) => {
    const service = event.target.name;
    const { first_number, second_number, operation } = this.state;

    switch (service) {
      case "c":
        this.setState(() => ({ ...this.INITIAL_STATE }));
        console.log("cleared");
        break;

      case "s":
        if (second_number) {
          let value;
          if (second_number[0] === "-") value = second_number.slice(1);
          else value = "-" + second_number;

          this.setState(() => ({ second_number: value }));
        } else {
          let value;
          if (first_number[0] === "-") value = first_number.slice(1);
          else value = "-" + first_number;

          this.setState(() => ({ first_number: value }));
        }
        break;

      case "%":
        if (second_number) {
          const value = (first_number / 100) * second_number;
          this.setState({ second_number: value });
        } else {
          if (first_number !== "0" && !operation) {
            const value = first_number / 100;
            this.setState({ first_number: value });
          }
        }

        break;

      default:
        break;
    }
  };


  calculate = () => {
    const has_second_number = this.state.second_number !== "";
    const has_operation = this.state.operation !== "";

    let first_number = parseFloat(this.state.first_number);
    let second_number = parseFloat(this.state.second_number);

    let { operation, prev } = this.state;
    let value;

    if (!has_second_number && !has_operation) {
      second_number = parseFloat(prev.number);
      operation = prev.operation;
    }

    switch (operation) {
      case "+":
        value = first_number + second_number;
        break;

      case "-":
        value = first_number - second_number;
        break;

      case "/":
        value = first_number / second_number;
        break;

      case "*":
        value = first_number * second_number;
        break;

      default:
        value = 0;
        break;
    }

    value = Math.floor(value) === Math.ceil(value) ? value : value.toFixed(3);

    this.setState({
      ...this.INITIAL_STATE,
      first_number: value.toString(),
      prev: { number: second_number, operation }
    });
  };

  render() {
    const { first_number, second_number, operation } = this.state;
    const value = !second_number ? first_number : second_number;

    return (
      <div className="App">
        <Display value={value} />
        <Keyboard
          operation={operation}
          numberKeyHandler={this.numberKeyHandler}
          operationKeyHandler={this.operationKeyHandler}
          serviceKeyHandler={this.serviceKeyHandler}
          calculate={this.calculate}
        />
      </div>
    );
  }
}

export default App;
