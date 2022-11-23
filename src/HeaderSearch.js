import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import debounce from "lodash.debounce";

export const HeaderSearch = ({ onClose, setQuery }) => {

  const textLang = (str) => {
    return /[а-я]/i.test(str);
  }

  //выполняем поиск с задержкой (200 мс), чтобы не отправлять лишних запросов, при помощи debounce функции
  const onChange = (text) => {
    if (!textLang(text)) {
      setQuery(text)
    }
  }

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onClose}>
        <AntDesign name="close" size={32} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Введите слово..."
        onChangeText={debounce(onChange, 200)}
        autoFocus={true}
      />
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