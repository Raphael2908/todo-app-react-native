import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

// Make a todo input component



export default function App() {
  [todoItems, setTodoItems] = useState([])

  const todoInput = () =>{
    return (
      <TextInput
      style={styles.input}
      value={text}
      />
    )
  }

  function addTodo(){
    setTodoItems(prevItems => {
      const newItems = [...prevItems]
      newItems.push(todoInput)
      return newItems
    }); 
  }
  return (
    <View style={{
      flex:1,
    }}>
      {/* Header */}
      <View style={{
        flex: 1,
        alignItems:"center",
        justifyContent:'center',
      }}>
        <Text style={styles.heading}>Todo app</Text>
      </View>
      
      {/* Sheet */}
      <View style={styles.sheet}>
        {todoItems.map((item, index) => (
              <Text style={{
                fontSize: 20,
                color: 'white'
              }} key={index}>{item}</Text>
            ))}
        <Pressable style={styles.floatingButton} onPress={addTodo}>
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
  floatingButton:{
    position: 'absolute',
    right: 50,
    bottom: 75,
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
  }
});
