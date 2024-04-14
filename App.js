import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, FlatList, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import TodoItem  from './components/TodoItem.js'
import * as Haptics from 'expo-haptics';
import { GestureHandlerRootView, GestureDetector, Gesture, Swipeable, Directions } from 'react-native-gesture-handler';
import AppleStyleSwipeableRow from './components/AppleStyleSwipeableRow.js'
import uuid from 'react-native-uuid';


export default function App() {
  const [todoItemsArray, setTodoItems] = useState([])
  const image = require('./assets/todo.png');

  function addTodos(){
    setTodoItems((array) => {
      return [...array, {key: uuid.v4(), component: <TodoItem/>}]
    })
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  }
  function removeTodo(key) {
    setTodoItems(prevState => {
      return prevState.filter((item) => item.key != key)
    });
  }
  
  return (
    <GestureHandlerRootView style={{
      flex:1,
    }}>
      
      {/* Header */}
      <View style={{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
      }}>
          <Text style={styles.heading}>Todo app</Text>
      </View>
      
      {/* Sheet */}
      <View style={styles.sheet}>
        <FlatList
            data={todoItemsArray}
            renderItem={
              ({item}) => 
              <Swipeable key={item.key} renderRightActions={AppleStyleSwipeableRow} rightThreshold={150} onSwipeableWillOpen={(direction) => removeTodo(item.key)}>
                {item.component}
              </Swipeable>
            }
          />
          <Pressable style={styles.floatingButton} onPress={addTodos}>
            <Ionicons name="add-outline" size={32} color="white" />
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
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
  floatingButton:{
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor:'#87CEEB',
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#87CEEB',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  floatingButtonText:{
    color: "white",
    fontSize: 42,
    padding: 0
  },
  sheet:{
    flex: 2,
    backgroundColor: '#272727',
    borderTopLeftRadius: '25',
    borderTopRightRadius: '25',
    paddingTop: 27
  },
  heading: {
    fontSize: 30,
    // color: 'white'
  }
});
