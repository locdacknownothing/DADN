import React from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import PaperButton from '../../components/Button'
import Paragraph from '../../components/Paragraph'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo/>
      <Header>Pasic Smart Office</Header>
      <PaperButton
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Đăng nhập
      </PaperButton>
      <PaperButton
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Đăng ký
      </PaperButton>
    </Background>
  )
}
