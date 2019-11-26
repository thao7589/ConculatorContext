import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Context from './../context/Context';
import InputNumberButton from './../components/InputNumberButton';

export default class ContextProvider extends React.Component {
    constructor(props) {
        super(props)
        this.initialState = {
          displayValue: '0',
          operator: null,
          firstValue: '',
          secondValue: '',
          nextValue: false
        }
        this.state = this.initialState;
    }

    handleInput = input => {  
      const { displayValue, operator, firstValue, secondValue, nextValue } = this.state;
  
      switch(input) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8': 
        case '9':
          this.setState({
            displayValue: (displayValue === '0') ? input : displayValue + input
          });
          if (!nextValue) {
            this.setState({
              firstValue: firstValue + input
            })
          } else {
            this.setState({
              secondValue: secondValue + input
            })
          }
          break;
        case '+':
        case '-':
        case 'x':
        case '/':
          this.setState({
            nextValue: true,
            operator: input,
            displayValue: (operator !== null ? displayValue.substr(0, displayValue.length -1) : displayValue) + input
          }); 
          break;       
        case '.':
          let dot = displayValue.toString().slice(-1);
          this.setState({
            displayValue: dot !== '.' ? displayValue + input : displayValue
          }); 
          if (!nextValue) {
            this.setState({
              firstValue: firstValue + input
            })
          } else {
            this.setState({
              secondValue: secondValue + input
            })
          }
          break;  
        case 'CLEAR': 
          this.setState(this.initialState);
          break;
        case 'DEL':
          let string = displayValue.toString();
          let deletedString = string.substr(0, string.length - 1);
          let length = string.length;
          this.setState({
            displayValue: length == 1 ? '0' : deletedString,
            firstValue: length == 1 ? '0' : deletedString
          });
          break;    
        case '=':
          let formatOperator = operator == "x" ? "*" : operator;
          let result = eval(firstValue + formatOperator + secondValue);
          this.setState({
            displayValue: result % 1 === 0 ? result : result.toFixed(2),
            firstValue: result % 1 === 0 ? result : result.toFixed(2),
            secondValue: '',
            nextValue: false,
            operator: null
          });
          break;  
      } 
    }

    render() {
        return(
            <Context.Provider value={{ 
                data: {
                    state: this.state,
                    handleInput: this.handleInput
                }
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
};



