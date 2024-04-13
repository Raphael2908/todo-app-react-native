import { useState, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useSharedValue, Easing, withTiming } from 'react-native-reanimated';
import { Svg, Path } from "react-native-svg";
import * as Haptics from 'expo-haptics';

export default function CheckBox({height, width, checked}){
  const backgroundColor = useSharedValue("transparent");
  const AnimatedCheckMark = Animated.createAnimatedComponent(Path);
  const checkMarkPath = "M5 72.8835C5 72.8835 28.7598 97 42.021 97C55.2823 97 97 5 97 5"
  const checkMarkPathProgress = useSharedValue(200)
  
  useEffect(() => {
    if(checked == true){
      checkMarkPathProgress.value = checkMarkFull
      backgroundColor.value = withTiming("skyblue")  
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    }
    else {
      checkMarkPathProgress.value = checkMarkEmpty
      backgroundColor.value = withTiming("transparent")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    }
    return () => {
      // No cleanup needed
    };
  }, [checked])
  const checkMarkFull = withTiming(0, {
    duration: 500,
    easing: Easing.inOut(Easing.quad),
  })
  const checkMarkEmpty = withTiming(200, {
    duration: 200,
    easing: Easing.inOut(Easing.quad),
  })

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      
        <Animated.View
          style={{...styles.checkbox, height: height, width: width, backgroundColor: backgroundColor}}
        >
        <Svg style={styles.check} width={width} height={height} viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
          <AnimatedCheckMark d={checkMarkPath} stroke="white" strokeWidth={10} strokeLinecap="round" strokeDasharray={200} strokeDashoffset={checkMarkPathProgress} />
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
