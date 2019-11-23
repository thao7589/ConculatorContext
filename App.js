import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputNumberButton from './components/InputNumberButton';
import ContextProvider from './ContextProvider/ContextProvider';
import Context from './context/Context';

export default class App extends React.Component {

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
                {data.renderButtons}
              </View>
            </View>
          )}
          
        </Context.Consumer>
      </ContextProvider>
    );
  }
}

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
  }
});