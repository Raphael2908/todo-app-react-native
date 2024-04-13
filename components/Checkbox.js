import { useState, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useSharedValue, Easing, withTiming } from 'react-native-reanimated';
import { Svg, Path } from "react-native-svg";
import * as Haptics from 'expo-haptics';


// // Check box state manager
// export default function CheckBox({height, width}){
//   const [checked, setChecked] = useState(false) 
//   function handlePress(){
//     setChecked(state => !state)
//   }
//   return (
//   <Pressable onPress={handlePress}>
//     <CheckBoxComponent height={height} width={height} checked={checked} />
//   </Pressable>
//   )
// }

// Check box Ui and animation 
const AnimatedCheckMark = Animated.createAnimatedComponent(Path);
const checkMarkFull = withTiming(0, {
  duration: 500,
  easing: Easing.inOut(Easing.quad),
})
const checkMarkEmpty = withTiming(200, {
  duration: 200,
  easing: Easing.inOut(Easing.quad),
})

export default function CheckBox({height, width, checked}){
  const backgroundColor = useSharedValue("transparent");
  const checkMarkPathProgress = useSharedValue(200)
  let checkMarkPath = "" // Re rendering this component may cause the logic below to not trigger which causes the tick to appear randomly

  if(checked == true){
    checkMarkPath = "M5 72.8835C5 72.8835 28.7598 97 42.021 97C55.2823 97 97 5 97 5"
    checkMarkPathProgress.value = checkMarkFull
    backgroundColor.value = withTiming("skyblue")  
  }
  else {
    checkMarkPath = ""
    checkMarkPathProgress.value = checkMarkEmpty
    backgroundColor.value = withTiming("transparent")
  }

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
        <Animated.View
          style={{...styles.checkbox, height: height, width: width, backgroundColor: backgroundColor}}
        >
        <Svg style={styles.check} width={width} height={height} viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
          <AnimatedCheckMark 
          d={checkMarkPath} 
          stroke="white" 
          strokeWidth={10} 
          strokeLinecap="round" 
          strokeDasharray={200} 
          strokeDashoffset={checkMarkPathProgress} />
        </Svg>
        </Animated.View>
        
    </View>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: "10%",
    borderColor: 'white',
    borderWidth: "3%",
  },
  check:{
    position: 'absolute',
    top: "-40%",
    left: "5%",
    // display: 'none'
  }
})
