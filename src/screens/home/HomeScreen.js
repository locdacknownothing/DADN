import React from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Paragraph from '../../components/Paragraph'
import PaperButton from '../../components/Button'

export default function HomeScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Trang chủ</Header>
      <Paragraph>
        Làm thêm page từ đây nè!
      </Paragraph>
      <PaperButton
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Đăng xuất
      </PaperButton>
    </Background>
  )
}