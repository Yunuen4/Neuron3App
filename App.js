import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Definimos las clases Neurona y AdminNeurona
class Neurona {
  constructor(id, voltaje, posicion_x, posicion_y, red, green, blue) {
    this.id = id;
    this.voltaje = voltaje;
    this.posicion_x = posicion_x;
    this.posicion_y = posicion_y;
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  print() {
    return `Neurona ID: ${this.id}, Voltaje: ${this.voltaje}, Posición: (${this.posicion_x}, ${this.posicion_y}), Color RGB: (${this.red}, ${this.green}, ${this.blue})`;
  }
}

class AdminNeurona {
  constructor() {
    this.neuronas = [];
  }

  agregar_inicio(neurona) {
    this.neuronas.unshift(neurona);
  }

  agregar_final(neurona) {
    this.neuronas.push(neurona);
  }

  mostrar() {
    return this.neuronas.map((neurona) => neurona.print()).join("\n\n");
  }

  clasificar_por_voltaje() {
    this.neuronas.sort((a, b) => b.voltaje - a.voltaje); // Ordenar de mayor a menor voltaje
  }
}

// Creamos el componente principal
const App = () => {
  const [neuronData, setNeuronData] = useState({
    id: '',
    voltaje: '',
    posicion_x: '',
    posicion_y: '',
    red: '',
    green: '',
    blue: ''
  });

  const [adminNeurona] = useState(new AdminNeurona());
  const [neuronasVisualizadas, setNeuronasVisualizadas] = useState('');

  const handleInputChange = (name, value) => {
    setNeuronData({
      ...neuronData,
      [name]: value
    });
  };

  const agregarNeurona = (inicio = false) => {
    const nuevaNeurona = new Neurona(
      neuronData.id,
      parseFloat(neuronData.voltaje),
      parseInt(neuronData.posicion_x),
      parseInt(neuronData.posicion_y),
      parseInt(neuronData.red),
      parseInt(neuronData.green),
      parseInt(neuronData.blue)
    );

    if (inicio) {
      adminNeurona.agregar_inicio(nuevaNeurona);
    } else {
      adminNeurona.agregar_final(nuevaNeurona);
    }

    Alert.alert("Neurona Agregada", nuevaNeurona.print());
  };

  const mostrarNeuronas = () => {
    setNeuronasVisualizadas(adminNeurona.mostrar());
  };

  const clasificarNeuronas = () => {
    adminNeurona.clasificar_por_voltaje();
    mostrarNeuronas();
  };

  return (
    <LinearGradient colors={['#87CEEB', '#1E90FF']} style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Captura de Neuronas</Text>

        {['id', 'voltaje', 'posicion_x', 'posicion_y', 'red', 'green', 'blue'].map((field) => (
          <View key={field}>
            <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)} (entero)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={`Ingrese el ${field.charAt(0).toUpperCase() + field.slice(1)}`}
              placeholderTextColor="#555"
              value={neuronData[field]}
              onChangeText={(value) => handleInputChange(field, value)}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={() => agregarNeurona(true)}>
          <Text style={styles.buttonText}>Agregar Neurona al Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => agregarNeurona(false)}>
          <Text style={styles.buttonText}>Agregar Neurona al Final</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={mostrarNeuronas}>
          <Text style={styles.buttonText}>Mostrar Neuronas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={clasificarNeuronas}>
          <Text style={styles.buttonText}>Clasificar por Voltaje</Text>
        </TouchableOpacity>

        <Text style={styles.neuronasOutput}>{neuronasVisualizadas}</Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#87CEEB',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 10,
    color: '#000',
    backgroundColor: '#DDEEFF',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2, // Para Android
  },
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // Para Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  neuronasOutput: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
  },
});

export default App;
