import React from 'react'
import Background from '../../components/Background'
import Header from '../../components/Header'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'

export default function Settings() {
  return (
    <View style={{backgroundColor: "#fff"}}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar rounded title="MD" size={70} containerStyle={{backgroundColor: '#F64561', marginTop: 10}}/>
          <Text style={styles.name}>
            Name
          </Text>
          <Text  style={styles.role}>
            Employee
          </Text>
        </View>

        <View style={styles.body}>
          <View style={styles.option}>
            <View>
              <Icon name="globe" type="feather" size={30} containerStyle={{marginVertical: 10, alignSelf: 'flex-start', marginLeft: 15, borderColor: "#000"}}/>
            </View>
            <Text style={{color: "#000", alignSelf: 'flex-end'}}>Ngôn ngữ</Text>
          </View>
          <View style={styles.option}>
            <View>
              <Icon name="moon" type="feather" size={30} containerStyle={{marginVertical: 10, alignSelf: 'flex-start', marginLeft: 15, borderColor: "#000"}}/>
            </View> 
          </View>
          <View style={styles.option}>
            <View>
              <Icon name="security" type="MaterialCommunityIcons" size={30} containerStyle={{marginVertical: 10, alignSelf: 'flex-start', marginLeft: 15, borderColor: "#000"}}/>
            </View>   
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#C4DAF5', height:'100%', borderTopLeftRadius: 50, borderTopRightRadius: 50},
  avatarContainer: {backgroundColor: "#FDEDEB", height: 90, width: 90, alignSelf: 'center', borderRadius: 100, marginTop: 20, marginBottom: 10, alignItems: 'center'},
  name: {marginTop: 10, fontSize: 24},
  role: {color: '#DF3222', fontSize: 16},
  body: {backgroundColor: '#d9d9d9', position: 'absolute', bottom: 0, height: "75%", width: '100%'},
  option: {width: '100%', backgroundColor: "#fff", height: 50, marginBottom: 2},
  
})