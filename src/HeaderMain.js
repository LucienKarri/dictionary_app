import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";

import { HeaderAdd } from "./HeaderAdd";
import { HeaderSearch } from "./HeaderSearch";

export const HeaderMain = ({screen, onChangeScreen, onAddWord, query, setQuery }) => {
  const [headerType, setHeaderType] = useState('main');

  const onClose = () => {
    setHeaderType('main');
    setQuery('');
  }

  //если нажата кнопка "добавить слово (плюс)" отображаем другой заголовк для добавления
  if (headerType === 'add') {
    return <HeaderAdd onClose={onClose} onAddWord={onAddWord} />
  }
  
  //если нажата кнопка "поиска" отображаем другой заголовк для поиска
  if (headerType === 'search') {
    return <HeaderSearch onClose={onClose} query={query} setQuery={setQuery} />
  }
  
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => setHeaderType('add')}>
        <AntDesign name="plus" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.screenButton} onPress={() => onChangeScreen()}>
        <Text style={styles.title}>{screen === 'dict' ? "Словарь" : 'Блокнот'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setHeaderType('search')}>
        <AntDesign name="search1" size={32} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,

    backgroundColor: '#fec89a',
    borderRadius: 10
  },
  screenButton: {
    flex: 1,
    alignItems:'center'
  },
  title: {
    fontSize: 32
  }
})
