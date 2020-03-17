import React, {useEffect, useState}  from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, AsyncStorage } from 'react-native';

export default function App() {

  const [x, setX] = useState(Math.floor(Math.random() * 100) + 1);
  const [instruction, setInstruction] = useState('Guess a number between 0-100 !');
  const [text, setText] = useState('') ;
  const [count, setCount] = useState(0);
  const [highscore, setHighscore] = useState(null);


  useEffect(() => {readHighscore()},[]);
  const resetGame = () => {
    setInstruction('Guess a number between 0-100 !');
    setX(Math.floor(Math.random() * 100) + 1);
    setCount(0);
    setText('');
}

  const buttonPressed = () => {
    console.log(x);
    setCount(count + 1);
    if(text == x ) {
      Alert.alert(`You make it in ${count + 1} guesses.` );
      saveHighscore(count + 1);
      readHighscore();
      resetGame();
    }
    else if (Number(text) > x ) {
      setInstruction(`Yo guess ${text} is too high.`);
      setText('');
    }
    else {
      setInstruction(`Yo guess ${text} is too low.`);
      setText('');
    };
  };

  const readHighscore = async () => {
        try {
         let value = await AsyncStorage.getItem('someKey');
         setHighscore(JSON.parse(value));
        } catch (error) {
         Alert.alert('Error reading data'); }
 }

  const saveHighscore = async (newHighscore) => {
        try {
            if( ((count + 1) < highscore) || highscore === null  ) {
                console.log( JSON.stringify(newHighscore));
                await AsyncStorage.setItem('someKey', JSON.stringify(newHighscore));
        }

        } catch (error) {
            Alert.alert('Error saving data');
} };
  const clearHighscore = () => {
      AsyncStorage.clear();
      console.log('clear!');
      setHighscore(null);
}


  return (
    <View style={styles.container}>
      <Text>{instruction}</Text>
      <TextInput  style={{width:200, borderColor:'gray',  borderWidth:1}} onChangeText={(text) => setText(text)} value={text}/>
      <Button onPress={buttonPressed} title="MAKE GUESS" />
      <Button onPress={clearHighscore} title="Clear Highscore 🦑" />
      <Text>Highscore: {highscore} guesses</Text>
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
