import React from 'react'
import Background from '../../components/Background'
import Header from '../../components/Header'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

export default function Settings() {
  return (
    <View style={{backgroundColor: "#fff"}}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar rounded title="MD" size={70} containerStyle={{backgroundColor: '#F64561', marginTop: 10}}/>
          <Text>
            Name
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#C4DAF5', height:'100%', borderTopLeftRadius: 50, borderTopRightRadius: 50},
  avatarContainer: {backgroundColor: "#FDEDEB", height: 90, width: 90, alignSelf: 'center', borderRadius: 100, marginTop: 20, marginBottom: 10, alignItems: 'center'},
  avatarName: {marginTop: 10, fontSize: 30, fontFamily: 'Be Vietnam Pro'}
})