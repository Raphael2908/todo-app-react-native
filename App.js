import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TextInput, ImageBackground } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import CheckBox  from './components/Checkbox.js'
// Make a todo input component

class TodoItem {
  name; // String
  placeholder; // String
  isCompleted; // Boolean 
  constructor(name){
    this.name = name
    this.placeholder = 'Task'
    this.isCompleted = false
  }
}

export default function App() {
  const [todoItems, setTodoItems] = useState([])
  const image =require('./assets/todo.png');

  function addTodos() {
    setTodoItems(current => [...current, new TodoItem('')])
  }

  function handleTodoItemUpdate(text, index) {
    const newTodoItem = todoItems.map((t, i) => {
      if(i == index){
        return {
          ...t,
          name: text
        }
      }
      else {
        return t
      }
    })
    setTodoItems(newTodoItem)
  }
  return (
    <View style={{
      flex:1,
    }}>
      
      {/* Header */}
      <View style={{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
      }}>
          <Text style={styles.heading}>Todo app</Text>
        {/* <ImageBackground source={image} resizeMode="cover" style={{flex:1, justifyContent:"center", alignItems:'center'}}>
        </ImageBackground> */}
      </View>
      
      {/* Sheet */}
      <View style={styles.sheet}>
        <CheckBox />
        {todoItems.map((item, index) => (
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Pressable key={index}>
                  <Text>wadawd</Text>
                </Pressable>
                <TextInput 
                style={styles.text} 
                placeholder={item.placeholder} 
                key={index} 
                value={item.name} 
                clearButtonMode='unless-editing'
                onChangeText={(text) => handleTodoItemUpdate(text, index)}
              />
              </View>
            ))}
          <Pressable style={styles.floatingButton} onPress={addTodos}>
            <Ionicons name="add-outline" size={32} color="white" />
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
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
    fontSize: 24
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
    padding: '10%',
  },
  heading: {
    fontSize: 30,
    // color: 'white'
  }
});
