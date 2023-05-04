import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useHistory } from 'react-router-dom'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import PaperButton from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import DrawerNavigator from '../../navigators/DrawerNavigator'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    // // navigation.reset({
    // //   index: 0,
    // //   routes: [{ name: 'HomeScreen' }],
    // // })
    const data = { email: email.value, password: password.value };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };

    const response = await fetch('http://192.168.31.17:5000/login/', options)
    const user = await response.json();

    if (user !== null) {
      // console.log("navigate with user ", user)
      navigation.navigate("HomeScreen", { user: user })    
    }
    else {
      setPassword({ ...password, error: "Sai tài khoản hoặc mật khẩu" })
    }
      // , {
        // screen: "Trang chủ",
        // params: { user: user }})

      // return <DrawerNavigator userRole={user.role} />
  }

  return (
    <Background>
      {/* {
        user !== null ? (
          <DrawerNavigator userRole={user.role} />
        ) : null
      } */}
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Đăng nhập</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Mật khẩu"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
      <PaperButton mode="contained" onPress={onLoginPressed}>
        Đăng nhập
      </PaperButton>
      <View style={styles.row}>
        <Text>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
