import { useState} from "react";
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import Animated, { useSharedValue} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import CheckBox  from './Checkbox.js'

  
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function TodoItem(){
    const [task, setTask] = useState()
    const [isCompleted, setIsCompleted] = useState(false)
    const textDecorationLine = useSharedValue("none")
    
    function handlePress() {
        setIsCompleted(currentState => !currentState)
        if(task !== undefined){
            textDecorationLine.value = isCompleted ? "none" : "line-through"  // TODO: Add animations
        }
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    }

    return (
       <View style={{
        flex: 1,
        flexDirection: "row",
        gap: 10,
        padding: 5,
        backgroundColor: "#272727",
        paddingLeft: 10,
       }}>
            <Pressable onPress={handlePress}>
                <CheckBox height={30} width={30} checked={isCompleted}/>
            </Pressable>
            <AnimatedTextInput 
                style={{...styles.text, textDecorationLine}}
                placeholder={"Task"}
                placeholderTextColor="#727272"
                value={task}
                onChangeText={newText => setTask(newText)}
                defaultValue={task}
            />
       </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    text:{
      color: 'white',
      fontSize: 24,
      flexGrow: 1
    },  
    heading: {
      fontSize: 30,
      // color: 'white'
    }
  });