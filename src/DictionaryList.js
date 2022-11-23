import { Text, View,  StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export const DictionaryList = ({ list, screen, onAddWord, onDeleteWord }) => {
  const onClick = (item) => {
    if (screen === 'dict') {
      onAddWord({...item})
    } else {
      onDeleteWord(item)
    }
  }

  //выводим сообщение, если список слов пуст
  if (list.length === 0) {
    return (
      <View style={styles.cardView}>
        <Text style={styles.name}>Поиск по запросу не дал результатов</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={list}
      renderItem={({item}) => {
        return (
          <View style={styles.cardView}>
            <View style={styles.cardInfo}>
              <Text style={styles.name}>{item.en}</Text>
              <Text style={styles.translate}>{item.ru}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => onClick(item)}>
              {screen === 'dict' ?
                <AntDesign name="plus" size={32} color="black" />
                :
                <AntDesign name="delete" size={32} color="black" />
              }
            </TouchableOpacity>
          </View>
        )
      }}
      keyExtractor={item => item.id}
    />
  )
}

const styles = StyleSheet.create({
  cardView: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,

    backgroundColor: '#f8edeb',
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
  },
  translate: {
    fontSize: 18,
    color: 'grey'
  }
})

