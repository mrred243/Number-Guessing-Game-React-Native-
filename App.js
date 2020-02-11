import React, {useEffect, useState}  from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function App() {

  const [x, setX] = useState(0);
  const [instruction, setInstruction] = useState('Guess a number between 0-100 !');
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

      useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        setX(randomNumber)
      }, []);

  const buttonPressed =  () => {
    setCount(count + 1);
    if(text == x ) {
      Alert.alert('You make it in ' +  count + ' guesses.' );
    }
    else if (Number(text) > x ) {
      setInstruction("Yo guess " + text + " is too high.");
      setText('');
    }
    else {
      setInstruction("Yo guess " + text + " is too low.");
      setText('');
    };

  }

  return (
    <View style={styles.container}>
      <Text>{instruction}</Text>
      <TextInput  style={{width:200, borderColor:'gray',  borderWidth:1}} onChangeText={(text) => setText(text)} value={text}/>
      <Button onPress={buttonPressed} title="MAKE GUESS" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
