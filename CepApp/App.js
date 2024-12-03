import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);

  // Função para buscar o endereço pelo CEP
  const buscarCep = async () => {
    if (!cep || cep.length !== 8) {
      Alert.alert('Erro', 'Por favor, insira um CEP válido!');
      return;
    }

    try {
      // Fazendo a requisição para a API ViaCEP usando Axios
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      
      // Verifica se o retorno da API contém um erro
      if (response.data.erro) {
        Alert.alert('Erro', 'CEP não encontrado!');
        return;
      }

      // Armazena os dados retornados no estado
      setEndereco(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar o CEP!');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />
      <Button title="Buscar Endereço" onPress={buscarCep} />
      
      {endereco && (
        <View style={styles.resultado}>
          <Text><strong>Logradouro:</strong> {endereco.logradouro}</Text>
          <Text><strong>Bairro:</strong> {endereco.bairro}</Text>
          <Text><strong>Cidade:</strong> {endereco.localidade}</Text>
          <Text><strong>Estado:</strong> {endereco.uf}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  resultado: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
  },
});
