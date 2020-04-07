import React, { Component } from 'react';
import { TextInput, Button, View, StyleSheet } from 'react-native';
import { windowWidth } from '../../../App';

interface ICreateNoteFromProps {
    noteText: string;
    onSave: (text: string) => void;
}

export const CreateNoteFrom: React.FC<ICreateNoteFromProps> = ({ onSave, noteText }) => {
  const [value, onChangeText] = React.useState('');

  React.useEffect(() => {
    onChangeText(noteText);
  }, [noteText])

  const handleSavePress = () => {
    onSave(value);
    onChangeText('');
  }

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            multiline={true}
            numberOfLines={10}
            onChangeText={text => onChangeText(text)}
            value={value}
        />
        <Button title='Сохранить заметку' onPress={handleSavePress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 20,
    width: windowWidth,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});

