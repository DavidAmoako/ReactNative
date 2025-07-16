import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';

const RegisterForm = ({ onRegister }) => {
  const [userType, setUserType] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    bio: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    if (termsAccepted) {
      onRegister({ ...formData, userType });
    } else {
      alert('You must accept the terms and conditions to register.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setUserType('user')} style={[styles.tab, userType === 'user' && styles.activeTab]}>
          <Text>Homeowner</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserType('worker')} style={[styles.tab, userType === 'worker' && styles.activeTab]}>
          <Text>Professional</Text>
        </TouchableOpacity>
      </View>
      <TextInput placeholder="First Name" style={styles.input} value={formData.firstName} onChangeText={(text) => handleInputChange('firstName', text)} />
      <TextInput placeholder="Last Name" style={styles.input} value={formData.lastName} onChangeText={(text) => handleInputChange('lastName', text)} />
      <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" value={formData.email} onChangeText={(text) => handleInputChange('email', text)} />
      <TextInput placeholder="Phone Number" style={styles.input} keyboardType="phone-pad" value={formData.phone} onChangeText={(text) => handleInputChange('phone', text)} />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={!showPassword}
        value={formData.password}
        onChangeText={(text) => handleInputChange('password', text)}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
      </TouchableOpacity>
      {userType === 'worker' && <TextInput placeholder="Professional Bio" style={styles.input} multiline value={formData.bio} onChangeText={(text) => handleInputChange('bio', text)} />}
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={termsAccepted ? 'checked' : 'unchecked'}
          onPress={() => {
            setTermsAccepted(!termsAccepted);
          }}
        />
        <Text>I agree to the Terms of Service and Privacy Policy</Text>
      </View>
      <Button title="Create Account" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f4ff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default RegisterForm;