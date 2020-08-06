import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { selectAssetSource } from 'expo-asset/build/AssetSources';
import IconBack from 'react-native-vector-icons/AntDesign';
import datab from './WordsDatabase'
import IconPower from 'react-native-vector-icons/AntDesign';
import IconForward from 'react-native-vector-icons/SimpleLineIcons';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height)

export default function Challenge({ navigation, route }) {
  function load(val) {
    console.log("Load function started")
    const ques = datab[val][Math.floor(Math.random() * datab[val].length)]
    txt = ques.question
    cor = ques.correctanswer
    var ar = [ques.correctanswer]
    while (ar.length < 4) {
      const ques = datab[val][Math.floor(Math.random() * datab[val].length)]
      if (!(arr.includes(ques.correctanswer))) {
        ar.push(ques.correctanswer)
      }
    }
    arr = ar
    shuffle(arr)
  }
  function answer(answer) {
    let ans = (correct.toLocaleLowerCase() === answer.toLocaleLowerCase())
    navigation.navigate("ChallengeResult", { answer: ans, correct: correct, mode: result, perwee: perweek, question: text, lvl: lvl, xp: xp, pu: powerupp })
  }
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  function powerup() {
    if (powerupp > 0 && text3.length < correct.length) {
      setText3(text3 + correct[text3.length])
      sethint2("Hint : The word starts with " + text3 + correct[text3.length] + " The length of the word is = " + correct.length)
      setpowerupp(powerupp - 1)
    }
  }

  const result = route.params.answer
  const perweek = route.params.perweek
  const lvl = route.params.lvl
  const xp = route.params.xp
  var pu = route.params.pu

  let txt = ''
  let cor = ''
  let arr = []

  let txt2 = ''
  load(result)
  const [powerupp, setpowerupp] = React.useState(pu)
  const [text, setText] = React.useState(txt)
  const [options, setOptions] = React.useState(arr)
  const [correct, setCorrect] = React.useState(cor)
  const [text2, setText2] = React.useState(txt2)
  const [text3, setText3] = React.useState(correct[0].toLocaleUpperCase())

  const hint = "Hint : The word starts with " + text3 + " The length of the word is " + correct.length;
  const [hint2, sethint2] = React.useState(hint)

  return (
    <View style = {{flex : 1}}>
    <KeyboardAvoidingView
    behavior= "position" 
    style={{ flex: 1, backgroundColor : 'white'}} keyboardVerticalOffset = {-160}>
    <View style ={{flexDirection : 'row'}}>  
      <IconBack name="home" size={40} onPress={() => navigation.navigate('Home', { mode: result, perweek: perweek, lvl: lvl, xp: xp, pu: powerupp })} style={styles.home} />
      <View style = {styles.PowerButton}>
        <IconPower name = "star" size = {40} onPress={() => { powerup() }} style = {{alignSelf:'flex-end'}} color = 'black'/>
      </View>
    </View>
    <View style = {styles.numberPow}>
      <Text style = {{fontSize : 24}}>{powerupp}</Text>
    </View>
        <View style={styles.questionBox}>
          <Text style={styles.text}> {text}</Text>
        </View>
       
        <View style={{ alignItems: 'center', alignSelf: 'center', justifyContent: 'center', paddingTop: screenHeight / 35 }}>
          <Text style={styles.text2}> {hint2}</Text>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={{ height: 40, fontSize : 40}}
            placeholder="Type here!"
            onChangeText={text2 => setText2(text2)}
            defaultValue={text2}
          />
        </View>
        <IconForward name = "control-forward" size={50} onPress={() => answer(text2)} style = {{alignSelf : 'center',paddingTop : screenHeight / 20, marginBottom : screenHeight / 20}}/>
     </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  PowerButton: {
    width : screenWidth/1.25,
    paddingTop: screenHeight /15,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  home: {
    paddingTop: screenHeight /15,
    paddingLeft: 10,
    color: 'black',
    left: 10,
  },
  timer: {
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: "center"
  },
  questionBox: {
    width: screenWidth - 40,
    height: screenHeight / 5,
    backgroundColor: '#ebb400',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop : screenHeight/15,
  },
  text: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 36,
    textAlign : 'center',
  },
  text2: {
    textAlign: "center",
    paddingTop: 30,
    fontWeight: 'bold',
    fontSize: 30,
    paddingLeft: screenWidth / 8,
    paddingRight: screenWidth / 8,
  },
  inputBox: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: screenHeight / 20,
    width: screenWidth - 40,
    height : screenHeight / 4,
    borderWidth: 1,
    borderRadius : 20,
  },
  numberPow : {
    alignItems : 'flex-end',
    justifyContent : 'flex-end',
    width : screenWidth,
    paddingRight : screenWidth / 9,
  }
});