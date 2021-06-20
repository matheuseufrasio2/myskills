import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';
import { WarnModal } from '../components/WarnModal';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [grettings, setGrettings] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGrettings('GoodMorning')
    } else if (currentHour >= 12 && currentHour < 18) {
      setGrettings('Good afternoon')
    } else {
      setGrettings('Good night')
    }
  }, []);

  function handleAddNewSkill() {
    const newSkillLowerCase = newSkill.toLowerCase();
    const skillAlreadyExists = mySkills.find(skill => skill.name.toLowerCase() === newSkillLowerCase);

    if (skillAlreadyExists) {
      setModalVisible(true);
      return;
    };

    if (newSkill === '') return;

    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills([...mySkills, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ))
  }

  const onRequestClose = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <SafeAreaView style={styles.container} >
      <WarnModal
        warnText="You already have this skill, please add another 😁"
        closeButtonText="Okay"
        visible={modalVisible}
        onRequestClose={onRequestClose}
        onPress={() => setModalVisible(!modalVisible)}
      />

      <Text style={styles.title} >Welcome, Matheus</Text>
      <Text style={styles.grettings} >{grettings}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill" 
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>
      
      <FlatList
        data={mySkills}
        keyExtractor={item => item.id} 
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  // Styles do Modal
  centeredView: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  grettings: {
    color: '#fff'
  }
});
