import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar as AndroidStatusBar, Platform, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons';

import { dictionary } from './data/dictionary';
import { HeaderMain } from './src/HeaderMain';
import { DictionaryList } from './src/DictionaryList';

export default function App() {
  const [screen, setScreen] = useState('dict');
  const [words, setWords] = useState([]);
  const [query, setQuery] = useState('');
  const [ready, setReady] = useState(false);

  const loadWords = () => {
    AsyncStorage.getItem('myDictionaryWords')
      .then((data) => {
        if (data) {
          setWords(JSON.parse(data))
        }
      })
      .catch((error) => console.log(error))
  }

  if (!ready && screen !== 'dict') {
    return (
      <AppLoading
        startAsync={loadWords}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    )
  }

  const onChangeScreen = (val) => {
    if (val === 1) {
      setScreen('info')
    } else if (screen === 'dict') {
      setScreen('words')
    } else {
      setScreen('dict')
    }
  }

  const onAddWord = (newWord) => {
    if (words.filter((item) => item.id === newWord.id).length === 0) {
      const newArr = [newWord, ...words];
      AsyncStorage.setItem('myDictionaryWords', JSON.stringify(newArr))
      .then(() => setWords(newArr))
      .catch((error) => console.log(error))
    }
  }

  const onDeleteWord = (word) => {
    const newArr = words.filter((item) => item.id !== word.id);
    AsyncStorage.setItem('myDictionaryWords', JSON.stringify(newArr))
      .then(() => setWords(newArr))
      .catch((error) => console.log(error));
  }

  const filterList = () => {
    const arr = screen === 'dict' ? dictionary : words;

    if (query) {
      return arr.reduce((total, item) => {
        const index = item.en.toString().indexOf(query.toLowerCase())
        if(index === 0) { 
          total.push(item)
        }
        return total
      }, [])
    }
    return arr;
  }

  return screen === 'info' ? (
    <SafeAreaView style={styles.androidSafeAreaView}>
      <TouchableOpacity onPress={() => setScreen('dict')}>
        <AntDesign name="close" size={32} color="black" />
      </TouchableOpacity>
      <View style={styles.info}>
          <Text style={styles.text}>{`Калачева Е. А.${'\n'}20ИСТ(б)ОП`}</Text>
          <Text style={styles.text}>Задание: разработать программную систему в соответствии с вариантом задания.</Text>
          <Text style={styles.text}>Вариант №6 - Программа для запоминания английских слов. Базовый словарь с возможностью пополнения.</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.androidSafeAreaView}>
      <HeaderMain
        screen={screen}
        onChangeScreen={onChangeScreen}
        onAddWord={onAddWord}
        query={query}
        setQuery={setQuery}
      />
      <DictionaryList
        list={filterList()}
        screen={screen}
        onAddWord={onAddWord}
        onDeleteWord={onDeleteWord}
      />
      <TouchableOpacity style={styles.about} onPress={() => onChangeScreen(1)}>
        <AntDesign name="questioncircleo" size={32} color="black" />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  androidSafeAreaView: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
    paddingTop: Platform.OS === "android" ? AndroidStatusBar.currentHeight : 0,
    backgroundColor: '#f9dcc4',
  },
  info: {
    marginTop: 16,
  },
  text: {
    fontSize: 32,
    marginBottom: 8
  },
  about: {
    position: 'absolute',
    left: 16,
    bottom: 16
  }
});
