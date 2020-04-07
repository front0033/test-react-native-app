import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { CreateNoteFrom } from './src/components/CreateNoteFrom';
import { MyCamera } from './src/components/Camera';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Content, CardItem, Card } from 'native-base';
import * as Font from 'expo-font';

interface INote {
  id: number;
  title: string;
}

export const windowWidth = Dimensions.get('window').width;

async function getFonts(cb: () => void)  {
  try {
    const fonts = await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    }).then(() => 1);
    console.log(fonts);
    if (fonts && cb) {
      cb();
    } 
    
  } catch (error) {
    console.log('error loading icon fonts', error);
  }
}

export default function App() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [notes, setNotes] = React.useState<INote[]>([]);
  const [currentEditItem, setCurrentEditItem] = React.useState<INote | null>(null);

  React.useEffect(() => {
    getFonts(() => setLoading(false));
  }, []);

  const handleCreateNote = (text: string) => {
    console.log(text);
    const newNote: INote = { id: new Date().getTime(), title: text };
    setNotes([newNote, ...notes]);
  };

  const editNote = (id: number) => () => {
    setCurrentEditItem(notes.find((n) => n.id === id) || null);
  };

  const deleteNote = (id: number) => () => {
    const newNotes = notes.filter((n) => n.id !== id);
    setNotes(newNotes);
  };

  const renderNote = (data: {item: INote, index: number}) => {
    const { id } = data.item;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onLongPress={deleteNote(id)}
        onPress={editNote(id)}
      >
        <CardItem style={styles.note}>
          <Text>{data.item.title}</Text>
        </CardItem>
      </TouchableOpacity>
    );
  }

  return !loading && (
    <Container>
      <Header>
        <Left>
          <Button transparent={true}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
            <Title>Заметки</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <View style={styles.container} >
          {notes.length ? (
            <Card>
              {notes.map((n) => (
                <CardItem style={styles.note}>
                  <Text>{n.title}</Text>
                </CardItem>
              ))}
            </Card>
          ) : (
            <Text style={{margin: 10}}>Создайте свою первую заметку</Text>
          )}
          <CreateNoteFrom noteText={currentEditItem?.title ?? ''} onSave={handleCreateNote} />
        </View>
        <MyCamera />
      </Content>
    </Container>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  header: {
    height: 100,
  },
  note: {
    height: 40,
    width: windowWidth,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
});
