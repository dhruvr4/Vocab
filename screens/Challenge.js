import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity,TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { selectAssetSource } from 'expo-asset/build/AssetSources';


export default function Challenge({navigation,route}) {  
  class Question {
    question="";
    answers=[];
    correctanswer="";
    constructor( a, b, c) {
        this.question=a;
        for( i=0;i<4;i++) {
            this.answers[i] = b[i];
        }
        this.correctanswer=c;
    }
}
  const datab = {
    easy :[],
    medium:[],
    hard :[],
    default :[]
}
  function create_database() {
    add("something not clear",["ambigous","monotonous", "unique","lucid"], "ambigous","easy");
    add("something not clear",["ambigous","monotonous", "unique","lucid"], "ambigous","medium");
    add("something not clear",["ambigous","monotonous", "unique","lucid"], "ambigous","hard");
    add("something not clear",["ambigous","monotonous", "unique","lucid"], "ambigous","default");
  }
  add=( a,  b, c, type) => {
    toAdd = new Question(a,b,c);
    datab[type].push(toAdd)
}  
    function load(val) {
    create_database()
    const ques = datab[val][Math.floor(Math.random() * datab[val].length)]
    txt=ques.question
    cor =ques.correctanswer
    arr=ques.answers
    shuffle(arr)
    }

    function answer ( answer) {
      
      
      let ans= (correct.toLocaleLowerCase() ===  answer.toLocaleLowerCase())  
      navigation.navigate("ChallengeResult",{answer :ans,correct:correct})
    }  
    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }
    const result = JSON.stringify(route.params.answer)
    resul = result.substring(1,result.length-1)
    //console.log(resul)
    let txt=''
    let cor =''
    let arr=[]
    let txt2=''
    load(resul)
    const [ text, setText ] = React.useState(txt)
    const [ options, setOptions ] = React.useState (arr)
    const [ correct, setCorrect ] = React.useState(cor)
    const [ text2, setText2 ] = React.useState(txt2)
    
    //let time = setInterval(this.tick, 1000);
    
    const hint = "Hint : The word starts with " +correct[0].toLocaleUpperCase() + " The length of the word is = " + correct.length;
    return (
    <View>
      <Text style = {styles.text}> {text}</Text>
      <Text style = {styles.text2}> {hint}</Text>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={text2 => setText2(text2)}
        defaultValue={text2}
      />
       <Button
        onPress={() => {answer(text2)}}
        title="Enter"
        color="#841584"
      /> 
    </View>
    );
}
const styles = StyleSheet.create({
  timer:{
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize :30,
    textAlign: "center"    
  },
  text:{
    textAlign: "center",
    paddingTop: 30,
    fontWeight: 'bold',
    fontSize :30,
    width : 300,
    height : 100,
    backgroundColor:'#696969',
  },
  text2:{
    textAlign: "center",
    paddingTop: 30,
    fontWeight: 'bold',
    fontSize :30,
    width : 300,
    height : 200,
    backgroundColor:'#696969',
  },

  button0:{
    paddingTop:20,
    backgroundColor:'white',
    width:400,
    height :90,
  },
  button1:{
    width:400,
    height :90,
    backgroundColor:'white'
  },
  button2:{
    width:400,
    height :90,
    backgroundColor:'white'
  },
  button3:{
    width:400,
    height :90,
    backgroundColor:'white'
  },


  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});