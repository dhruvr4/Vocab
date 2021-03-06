import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import IconSetting from 'react-native-vector-icons/Feather';
import ProgressCircle from 'react-native-progress-circle'
import datab from './WordsDatabase'
import Coverflow from 'react-native-coverflow';
import firebase from 'firebase'
import {heightToDp, widthToDp, normalize} from '../util'

  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);
let unsubscribe;

function HomeScreen({ navigation, route }) {
 // console.log("lollll")
  const [words_done,setwords_done] = React.useState({ "easy": [], "medium": [], "hard": [] })
  const [ans,setans] = React.useState("hard")
  const [lvl,setlvl] = React.useState(1)
  const [xp,setxp] = React.useState(0)
  const [pu,setpu] = React.useState(0)
  var user = firebase.auth().currentUser;
  var db = firebase.firestore();
  var userInfoRef = db.collection("Users").doc(user.uid);
  const levels = []
  for (var i = 100; i < 10000; i = i + 10) {
    levels[i / 10 - 10] = i
  }

  lvlupdate()
  check_words_done()
 // console.log("Data Received"+route.params)
 React.useEffect(() => {
  try {
    if (route.params.xp >-1){
   //console.log("Pulling from phone ")
    setwords_done(route.params.words_done)
    setans(route.params.mode)
    setlvl(route.params.lvl)
    setxp(route.params.xp)
    setpu(route.params.pu)
    userInfoRef.update({
      "mode": ans,
      "words_done": words_done,
      "level": lvl,
      "xp": xp,
      "powerups": pu
    })
  }
  else {
    throw Error
  }
}
catch {
if (route.params== undefined || route.params.xp <0){
  //console.log("Pulling from firebase")
  userInfoRef.onSnapshot((doc) => {
    setwords_done(doc.data().words_done)
    setans(doc.data().mode)
    setlvl(doc.data().level)
    setxp(doc.data().xp)
    setpu(doc.data().powerups)
  })
}
}}
,[])

  function load(val) {
    const today = new Date().getFullYear() * 365 + new Date().getMonth() * 31 + new Date().getDate()
    var num = Math.abs((today) % datab['default'].length)
    const ques = datab['default'][num]
    txt = ques.question
    cor = ques.correctanswer
  }
  function lvlupdate() {
    while (xp > levels[lvl]) {
      xp = xp - levels[lvl]
      lvl = lvl + 1
      pu = pu + 1
    }
  }
  function   check_words_done(){
    
    if(words_done["easy"].length==datab["easy"].length){
      words_done["easy"]=[]
    }
    if(words_done["medium"].length==datab["medium"].length){
      words_done["medium"]=[]
    }
    if(words_done["hard"].length==datab["hard"].length){
      words_done["hard"]=[]
    }
    
  }


  let txt = ''
  let cor = ''
  let arr = []
  load('default')
  //console.log(ans)

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', width : screenWidth, height : screenHeight/10, marginTop : '10%', alignContent:'center'}}>
        <View style = {styles.wrenchIcon}>
          <IconSetting name="settings" size={normalize(40)} onPress={() => navigation.navigate('Setting', { mode: ans, lvl: lvl, xp: xp, pu: pu, words_done: words_done })} style={{color : 'black', paddingTop : normalize(23)}} />
        </View>  
        <View style={styles.titleContainer} >
          <Text style={styles.vocab}>Voc-AB</Text>
        </View>
        <TouchableOpacity style={styles.Progress} onPress ={() => navigation.navigate('Leaderboard', { mode: ans, lvl: lvl, xp: xp, pu: pu, words_done: words_done })}
           >
          <ProgressCircle
            percent={(xp / levels[lvl]) * 100}
            radius={25}
            borderWidth={7}
            color="#3399FF"
            shadowColor="#e6e6e6"
            bgColor="#fff"
            >
            <Text style={{ fontSize: 20, fontFamily:'ReemKufi' }}>{lvl}</Text>
          </ProgressCircle>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:'6%', }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
            <TouchableOpacity style={styles.learnit} onPress={() => navigation.navigate("LearnIt", { answer: ans, lvl: lvl, xp: xp, pu: pu, words_done: words_done })}>
              <Text style={styles.cardText}>Learn It</Text>
              <IconSetting name="book-open" size={normalize(42)} color="white" style={{paddingTop:'12%', paddingLeft:'78%', }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.challenge} onPress={() => navigation.navigate("Challenge", { answer: ans, lvl: lvl, xp: xp, pu: pu, words_done: words_done })}>
              <Text style={styles.cardText}>Challenge</Text>
              <IconSetting name="edit-2" size={normalize(42)} color="white" style={{paddingTop:'12%', paddingLeft:'78%',}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timeTrial} onPress={() => navigation.navigate("TimeTrial", { answer: ans, lvl: lvl, xp: xp, pu: pu, words_done: words_done })}>
              <Text style={styles.cardText}>Time Trial</Text>
              <IconSetting name="clock" size={normalize(42)} color="white" style={{paddingTop:'12%', paddingLeft:'78%',}}/>
            </TouchableOpacity>
            
        </ScrollView>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ paddingRight: normalize(6), paddingLeft: normalize(20),paddingTop: normalize(6) }}>
          <IconSetting name="book" size={normalize(42)} onPress={() => navigation.navigate('Dictionary', { mode: ans, lvl: lvl, xp: xp, pu: pu, words_done: words_done })} style={styles.Dictionary} />
        </View>
        <View style={{ paddingRight: '10%', paddingTop : 9}}>
          <Text style={{ fontSize: normalize(43), fontWeight: '600', fontFamily:'ReemKufi', }}>Word of the Day</Text>
        </View>
      </View>

      <View style={styles.WordOfDay}>
        <Text style={styles.WordText}>{cor.charAt(0).toUpperCase() + cor.substring(1, cor.length)}</Text>
        <Text style={styles.DefinitionText}>{txt}</Text>
      </View>
    </View>
  )
}
HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  buttonContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: screenHeight / 3.6,
    width : screenWidth,
    marginTop: screenHeight / 20,
  },

  vocab: {
    fontSize: normalize(53),
    color: '#0b5cd5',
    fontFamily: 'SansForge',
    flex:1,
    marginTop:'4%'
  },

  wrenchIcon: {
    paddingLeft: '5%',
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    color: 'black',
    flex : 1,
  },

  Progress: {
    alignItems: "flex-end",
    paddingTop : screenHeight / 46,
    paddingRight : screenWidth / 20,
    flex : 1,
    fontFamily: 'ReemKufi'
  },

  learnit: {
    marginBottom: '4%',
    borderRadius: 35,
    width: screenWidth - 50,
    height : screenHeight / 4,
    backgroundColor: '#0b5cd5',
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 15,
    },

    shadowOpacity: 0.38,
    shadowRadius: 16.00,
    elevation: 24,
  },

  timeTrial: {
    marginBottom: '4%',
    width: screenWidth - 50,
    height : screenHeight / 4,
    backgroundColor: '#bd0a0a',
    borderRadius: 35,
    marginRight: 10,
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 15,
    },
    shadowOpacity: 0.38,
    shadowRadius: 16.00,
    elevation: 24,
  },

  challenge: {
    marginBottom: '4%',
    width: screenWidth - 50,
    backgroundColor: '#ffc300',
    borderRadius: 35,
    marginLeft: 15,
    height : screenHeight / 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 15,
    },
    shadowOpacity: 0.38,
    shadowRadius: 16.00,
    elevation: 24,
  },

  cardText: { 
    paddingLeft: '10%',
    paddingTop: '5%',
    fontSize: normalize(50), 
    color: 'white', 
    fontFamily:'ReemKufi', 
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex : 5,
  },

  WordText: {
    fontSize: normalize(50),
    alignSelf: 'flex-start',
    paddingLeft: screenWidth / 15,
    paddingTop: screenHeight / 60,
    fontFamily:'ReemKufi',
  },

  DefinitionText: {
    fontWeight: '300',
    fontSize: normalize(24),
    paddingLeft: screenWidth / 15,
    paddingRight: screenWidth / 15,
    paddingTop: screenHeight / 55,
    fontFamily:'ReemKufi',
  },

  WordOfDay: {
    borderRadius: 25,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: normalize(30),
    backgroundColor: 'white',
    width: screenWidth - 40,
    height: '30%',
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.55,
    shadowRadius: 16.00,
    elevation: 24,
  },
  
  Dictionary: {
    paddingLeft: '3%',
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    color: 'black',
  }
});