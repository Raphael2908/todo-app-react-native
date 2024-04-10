import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useSharedValue, Easing, withTiming } from 'react-native-reanimated';
import { Svg, Path } from "react-native-svg";
import * as Haptics from 'expo-haptics';

export default function CheckBox(){
  const [checked, setCheckBox] = useState(false) 
  const backgroundColor = useSharedValue("crimson");

  const AnimatedCheckMark = Animated.createAnimatedComponent(Path);
  const checkMarkPath = "M5 72.8835C5 72.8835 28.7598 97 42.021 97C55.2823 97 97 5 97 5"
  const checkMarkPathProgress = useSharedValue(200)
  const checkMarkFull = withTiming(0, {
    duration: 500,
    easing: Easing.inOut(Easing.quad),
  })
  const checkMarkEmpty = withTiming(200, {
    duration: 200,
    easing: Easing.inOut(Easing.quad),
  })

  const handlePress = () => {
    setCheckBox(state => !state)
    backgroundColor.value = checked ?  "crimson" : "violet";
    checkMarkPathProgress.value = checked ? checkMarkEmpty : checkMarkFull
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Pressable onPress={handlePress}>
        <Animated.View
          style={{...styles.checkbox, backgroundColor: backgroundColor }}
        >
        <Svg style={styles.check} width="92" height="92" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
          <AnimatedCheckMark d={checkMarkPath} stroke="black" strokeWidth={10} strokeLinecap="round" strokeDasharray={200} strokeDashoffset={checkMarkPathProgress} />
        </Svg>
        </Animated.View>
        
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    height: 100,
    width: 100,
    borderRadius: 25,
    borderColor: 'skyblue',
    borderWidth: 3,
  },
  check:{
    position: 'absolute',
    top: -15,
    left: 10,
    // display: 'none'
  }
})
