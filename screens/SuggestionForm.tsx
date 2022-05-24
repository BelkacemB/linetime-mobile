import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { primaryColor, secondaryColor, tertiaryColor } from '../constants/Colors';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, TouchableOpacity } from '../components/Themed';
import { TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MonoText } from '../components/StyledText';

export default function SuggestionForm() {

  const [energy, setEnergy] = useState('energized'); // TODO Create Energy type
  const [timeInMinutes, setTimeInMinutes] = useState(60); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Describe your current state</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Energy */}
      <View style={{ flexDirection: 'row' }}>
        <MonoText>I'm feeling </MonoText>
        {/* TODO: Replace following TextInput with energy */}
        <TextInput style={styles.textInput} value={energy} onChangeText={(text) => setEnergy(text)} />
      </View>
      {/* Time */}
      <View style={{ flexDirection: 'row' }}>
        <Text>And I have </Text>
        <TextInput style={styles.textInput} value={timeInMinutes.toString()} 
        onChangeText={(text) => setTimeInMinutes(+text)} />
        <Text> minutes available</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <TouchableOpacity style={styles.button}>
        <Text>Suggest 🚀</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textInput: {
    width: 80,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#eee"
  },
  button: {
    backgroundColor: secondaryColor,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  }
});
