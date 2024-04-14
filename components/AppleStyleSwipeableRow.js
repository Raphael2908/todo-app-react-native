import React, { Component, PropsWithChildren } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { RectButton} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';


export default function AppleStyleSwipeableRow (progress, dragX){
    return (
        <RectButton style={{
          flex: 1,
          backgroundColor: 'crimson',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          flexDirection: 'row'
        }}>
        <Animated.Text
          style={[
            styles.actionText
          ]}
          >
        <Feather name="trash" size={24} color="white" />        
        </Animated.Text>
      </RectButton>
    )
  }

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});