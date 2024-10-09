import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePhone } from './PhoneContext'; // Nhập context
import Icon from 'react-native-vector-icons/FontAwesome'; // Nhập biểu tượng từ FontAwesome

const HomeScreen = () => {
  const { phoneNumber } = usePhone(); // Lấy số điện thoại từ context
  const [isValid, setIsValid] = useState(true); // Trạng thái hợp lệ của số điện thoại
  const [message, setMessage] = useState(''); // Thông báo về tính hợp lệ của số điện thoại

  useEffect(() => {
    // Kiểm tra tính hợp lệ của số điện thoại
    const phoneRegex = /^[0-9]{10,15}$/; // Định nghĩa regex cho số điện thoại hợp lệ

    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      setIsValid(false);
      setMessage('Số điện thoại không hợp lệ. Vui lòng nhập lại.'); // Thông báo không hợp lệ
    } else {
      setIsValid(true);
      setMessage(''); // Không có thông báo
    }
  }, [phoneNumber]);

  return (
    <View style={styles.container}>
      {/* Thay thế logo bằng biểu tượng */}
      <View style={styles.iconContainer}>
        <Icon name="phone" size={100} color="#4CAF50" />
      </View>
      <Text style={styles.title}>Màn Hình Chính</Text>
      <Text style={styles.phoneText}>Số điện thoại của bạn:</Text>
      <Text style={styles.phoneNumber}>{phoneNumber || 'Chưa có số điện thoại'}</Text>
      {/* Hiển thị thông báo lỗi nếu số điện thoại không hợp lệ */}
      {!isValid && <Text style={styles.errorMessage}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50',
  },
  phoneText: {
    fontSize: 20,
    color: '#555',
  },
  phoneNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  errorMessage: {
    marginTop: 10,
    color: 'red', // Màu đỏ cho thông báo lỗi
    fontSize: 16,
  },
});

export default HomeScreen;
