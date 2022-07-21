import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, Touchable, TouchableOpacity, Image} from 'react-native';
import Modal from "react-native-modal";


export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [enteredEditText, setEnteredEditText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNTModalVisible, setIsNTModalVisible] = useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const NewTaskModal = () => setIsNTModalVisible(() => !isNTModalVisible);
  let [curIndex, setCurIndex] = useState();


  //UPDATE CURINDEX
  function curIndexUpdateHandler(goalIndex) {
    setCurIndex(goalIndex);
  }

  //ADD
  function goalInputHandler(enteredText){
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if(enteredGoalText != ''){
      setCourseGoals(currentCourseGoals => [...currentCourseGoals, enteredGoalText, ]);
      setEnteredGoalText('');
      setIsNTModalVisible(false);
    }else{
      setIsNTModalVisible(false);
    }
  }

  //EDIT
  function editGoalHandler(enteredText) {
    setEnteredEditText(enteredText);
  }

  function goalEditHandler() {
    if(enteredEditText != '') {
      courseGoals[curIndex] = enteredEditText;
      setEnteredEditText('');
      setIsModalVisible(false);
    }else{
      setIsModalVisible(false);
    }
  }

  //DELETE
  function deleteGoalHandler() {
    courseGoals.splice(curIndex, 1);
    setIsModalVisible(false);
  }

  return (
    <View style={styles.appContainer}>

      <Modal title='CRUDModal' isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <TextInput 
          style={styles.textInput}
          placeholder = {courseGoals[curIndex]}
          onChangeText={editGoalHandler}/>
          <Button title="Edit Task" onPress={goalEditHandler} />
          <Button title="Delete Task" onPress={deleteGoalHandler} />
          <Button title="Exit" onPress={handleModal} />
        </View>
      </Modal>

      <Modal title='NewTaskModal' isVisible={isNTModalVisible}>
        <View style={{ flex: 1 }}>
          <TextInput 
          style={styles.textInput}
          placeholder = {'Enter goal here!'}
          onChangeText={goalInputHandler}/>
          <Button title="Add Task" onPress={addGoalHandler} />

          <Button title="Open" onPress={() => setOpen(true)} />

          <Button title="Exit" onPress={NewTaskModal} />
        </View>
      </Modal>

      <View style={styles.goalsContainer}>
        <Text style={styles.tasksText}>Tasks:</Text>
        <FlatList data={courseGoals} renderItem={(itemData)=>{
          return (
            <View key={itemData.index}>
              <TouchableOpacity style={styles.goalItem} onPress={() => {handleModal(); curIndexUpdateHandler(itemData.index);}}>
                <Text>{itemData.item}</Text>
              </TouchableOpacity>
            </View>
          )
        } } alwaysBounceVertical={false}/>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPressIn={NewTaskModal}>
          <Image
          style={styles.addIcon}
          source={require('./assets/ADD_ICON.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
   flex: 1,
   paddingTop: 50,
   paddingHorizontal: 16,
   backgroundColor: '#19181a'
  },
  inputContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 24,
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flex: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
    backgroundColor: 'white'
  },
  goalsContainer: {
    flex: 5,
    flexDirection: 'column',
    color: 'white'
  },
  goalItem: {
    margin: 8,
    backgroundColor: '#5e0acc',
    padding: 8,
    borderRadius: 6,
    color: 'white'
  },
  goalText: {
    color: 'white'
  },
  deleteButton: {
    backgroundColor: '#cccccc',
    alignSelf: 'flex-end',
    width: '30%',
    color: 'white'
  },
  addIcon: {
    width: 60,
    height: 60,
  },
  tasksText: {
    color: 'orange',
    fontSize: 40,
  }
});
