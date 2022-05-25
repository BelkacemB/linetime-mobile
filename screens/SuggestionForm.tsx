import { StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";

import { secondaryColor } from '../constants/Colors';
import { Text, View, TouchableOpacity } from '../components/Themed';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SuggestionForm() {
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      energy: '',
      time: ''
    }
  });

  enum EnergyType {
    Tired,
    Normal,
    Energetic
  }

  const [energy, setEnergy] = useState<EnergyType>(EnergyType.Energetic);
  const [open, setOpen] = useState(false);
  const [timeInMinutes, setTimeInMinutes] = useState<number>(60);

  const energyTypeItems = [
    { label: 'Tired', value: EnergyType.Tired },
    { label: 'Normal', value: EnergyType.Normal },
    { label: 'Energetic', value: EnergyType.Energetic },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Describe your current state</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Energy */}
      <View style={{alignItems:'center', justifyContent: 'center'}}>
        <Text>I'm feeling </Text>
        <DropDownPicker
          open={open}
          value={energy}
          items={energyTypeItems}
          setValue={setEnergy}
          setOpen={setOpen}
          style={{width: 150}}
        />

      </View>

      {/* Line of empty text */}
      <View style={styles.blank} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Time */}
      <View style={{ flexDirection: 'row', zIndex: -5 }}>
        <Text>and I have </Text>
        <TextInput style={styles.textInput} value={timeInMinutes.toString()}
          onChangeText={(text) => setTimeInMinutes(+text)} keyboardType='numeric' />
        <Text> minutes available</Text>
      </View>

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
    justifyContent: 'center'
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
  blank: {
    marginVertical: 15,
    height: 1,
    width: '80%',
    opacity: 0
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
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    bottom: 20
  }
});
