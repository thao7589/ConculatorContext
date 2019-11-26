import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputNumberButton from './components/InputNumberButton';
import ContextProvider from './ContextProvider/ContextProvider';
import Context from './context/Context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderButtons = this.renderButtons.bind(this);
  }

  renderButtons(handleInput) {
    let layouts = buttons.map((buttonRow, rowIndex) => {
      let rowItem = buttonRow.map((buttonItem, buttonIndex) => {
        return <InputNumberButton value={buttonItem} handleOnPress={() => handleInput(buttonItem)} key={'btn-' + buttonIndex} />
      })
      return <View style={styles.inputRow} key={'row-' + rowIndex}>{rowItem}</View>
    })

    return layouts; 
  }

  render() {    
    return (
      <ContextProvider>
        <Context.Consumer>
          {({ data }) => (
            <View style={styles.container}>
              <View style={styles.resultContainer}>
                <Text style={styles.inputText}>{data.state.displayValue}</Text>
              </View> 
              <View style={styles.inputContainer}>
                {this.renderButtons(data.handleInput)}
              </View>
            </View>
          )}
          
        </Context.Consumer>
      </ContextProvider>
    );
  }
}

const buttons = [
  ['CLEAR', 'DEL'],
  ['7', '8', '9', '/'],
  ['4', '5', '6', 'x'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+']
];

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultContainer: {
    flex: 2,
    backgroundColor: '#1E1240'
  },
  inputContainer: {
    flex: 8,
    justifyContent: 'center',
    backgroundColor: '#3D0075'
  },
  inputText: {
    color: '#fff',
    fontSize: 80,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'right'
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',    
  }
});