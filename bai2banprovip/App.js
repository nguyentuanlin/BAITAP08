import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PhoneProvider, usePhone } from './PhoneContext';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

const SignInScreen = ({ navigation }) => {
  const { setPhoneNumber } = usePhone(); // Sử dụng Context
  const [phone, setPhone] = useState('');

  const handleInput = (value) => {
    const formattedValue = value.replace(/[^0-9]/g, '');
    if (formattedValue.length <= 10) {
      setPhone(formatPhoneNumber(formattedValue));
    }
  };

  const formatPhoneNumber = (value) => {
    const phoneNumberPattern = /^(\d{3})(\d{3})(\d{4})$/;
    const matches = value.match(phoneNumberPattern);
    if (matches) {
      return `${matches[1]}-${matches[2]}-${matches[3]}`;
    }
    return value;
  };

  const handleContinue = () => {
    if (!validatePhoneNumber(phone)) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ. Vui lòng nhập lại.', [
        { text: 'OK' },
      ]);
    } else {
      setPhoneNumber(phone); // Cập nhật số điện thoại trong Context
      navigation.navigate('Home'); // Chuyển đến HomeScreen
    }
  };

  const validatePhoneNumber = (number) => {
    const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;
    return phoneNumberPattern.test(number);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.phoneNumberInput}
          placeholder="Nhập số điện thoại"
          value={phone}
          onChangeText={handleInput}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue} activeOpacity={0.8}>
          <Text style={styles.continueButtonText}>Tiếp Tục</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default function App() {
  return (
    <PhoneProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PhoneProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
  },
  phoneNumberInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
