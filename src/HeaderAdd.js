import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";

import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";

export const HeaderAdd = ({ onClose, onAddWord }) => {
  const [en, setEn] = useState('');
  const [ru, setRu] = useState('');
  const [isSetted, setIsSetted] = useState(false)

  //проверяем язык ввода с помощью регулярного выражения
  const textLang = (str) => {
    return /[а-я]/i.test(str);
  }

  //при подтверждении ввода, отображаем разные инпуты и вызываем функцию добавляющую слово
  const onSubmit = () => {
    if (en.length > 0 && !textLang(en)) {
      setIsSetted(true)
    } 
    if (ru.length > 0 && isSetted && textLang(ru)) {
      onAddWord({id: en, en: en.toLowerCase(), ru: ru.toLowerCase()})
      onClose();
    }
  }

  

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onClose}>
        <AntDesign name="close" size={32} color="black" />
      </TouchableOpacity>
      {!isSetted ?
        <TextInput
          style={styles.input}
          placeholder="Введите слово..."
          value={en}
          onChangeText={(text) => {
            if(!textLang(text)) {
              setEn(text)
            }
          }}
          onSubmitEditing={onSubmit}
          autoFocus={true}
        /> :
        <TextInput
          style={styles.input}
          placeholder="Введите перевод..."
          value={ru}
          onChangeText={(text) => {
            if(textLang(text)) {
              setRu(text)
            }
          }}
          onSubmitEditing={onSubmit}
          autoFocus={true}
        />
      }
      <TouchableOpacity onPress={onSubmit}>
        <AntDesign name="check" size={32} color="black" />
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
  input: {
    flex: 1,
    paddingHorizontal: 8,

    fontSize: 24,
  }
})