import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Settings, TextInput, Dimensions } from 'react-native';
import IconBack from 'react-native-vector-icons/AntDesign';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function Login({ navigation, route }) {
    function login_existing() {
        navigation.navigate('Home', { mode: route.params.mode,lvl: route.params.lvl, xp: route.params.xp, pu: route.params.pu,words_done:route.params.words_done })
    }
    var result = route.params.mode
    const lvl = route.params.lvl
    const xp=route.params.xp
    const pu = route.params.pu
    var txt2 = ''
    const [text2, setText2] = React.useState(txt2)
    const [text3, setText3] = React.useState(txt2)
    return (
        <View>
        <IconBack name="home" size={40} onPress={() => navigation.navigate('Home', { mode: result,lvl:lvl,xp:xp,pu:pu,words_done:route.params.words_done })} style={styles.home} />
            <Text style={styles.AnswerText}>Log back in</Text>
            <View>
                <View style={styles.FieldContainer}>
                    <TextInput
                        style={styles.Field}
                        placeholder="Type your Email"
                        onChangeText={text2 => setText2(text2)}
                        defaultValue={text2}
                    />
                </View>
                <View style={styles.FieldContainer}>
                    <TextInput
                        style={styles.Field}
                        placeholder="Type your Password"
                        onChangeText={text3 => setText3(text3)}
                        defaultValue={text3}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.sumbitButton} onPress={() => { login_existing() }}>
              <Text style={styles.EnterText}>Submit !</Text>
            </TouchableOpacity>  
        </View>
    )
}
Login.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    home : {
        paddingTop: screenHeight/15,
        paddingLeft: 10,
        color: 'black',
        left: 10,
      },
    AnswerText: {
        fontWeight: 'bold',
        fontSize: 42,
        paddingTop: screenHeight / 15,
        textAlign : 'center'
    },
    EnterText: {
        fontWeight: 'bold',
        fontSize: 34,
        color:'white',
        textAlign : 'center'
    },
    sumbitButton: {
        width: screenWidth - 100,
        height: screenHeight / 14,
        backgroundColor: '#0b5cd5',
        alignItems: 'center',
        alignSelf : 'center',
        justifyContent: 'center',
        marginTop: screenHeight / 10,
        borderRadius: 30,
    },
    Field : {
        textAlign : 'center', 
        backgroundColor : '#ebebeb', 
        height : screenHeight / 15,
        borderRadius : 20,
        fontSize : 18,
    },
    FieldContainer : {
        paddingTop : screenHeight / 12,
        width : screenWidth - 40,
        alignSelf : 'center',
    }
});

export default Login


