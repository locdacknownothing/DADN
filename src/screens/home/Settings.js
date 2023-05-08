import React, {useState} from 'react'
import Background from '../../components/Background'
import Header from '../../components/Header'
import { StyleSheet, View, Text,Switch } from 'react-native'
import { Avatar, Icon} from 'react-native-elements'
import { theme } from '../../core/theme'
import { ceil } from 'react-native-reanimated'
import { img_urls } from '../../core/const'
import { Route } from 'react-router-dom'

export default function Settings({ navigation, route }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={{backgroundColor: "#fff"}}>
      <View style={styles.container}>
        <View style={styles.basicInfo}>
          <View style={styles.avatarContainer}>
            <Avatar rounded size={70} containerStyle={{backgroundColor: '#F64561', marginTop: 10}}
            source={img_urls[route.params.id]}/>
          </View>
          <Text style={styles.name}>
            {route.params.name}
          </Text>
          <Text  style={styles.role}>
            {route.params.role == 0 ? "Nhân viên" : "Quản lý"}
          </Text>
        </View>

        <View style={styles.body}>
          <View style={styles.option}>
            <View style={{borderWidth: 0, justifyContent: 'center', width: '15%'}}>
              <Icon name="globe" type="feather" size={30} containerStyle={{}}/>
            </View>
            <View style={{borderWidth: 0, justifyContent: 'center', width: '52%'}}>
              <Text style={{color: "#000", fontSize: 20}}>Ngôn ngữ</Text>
            </View>
            <View style={{flexDirection: 'row', width: '33%', justifyContent: 'center', borderWidth: 0}}>
              <View style={{justifyContent: 'center'}}>
                <Text style={{color: "#9c9c9c", fontSize: 20}}>
                  Tiếng Việt
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Icon name="chevron-right" type="AntDesign" size={30} containerStyle={{}}/>
              </View>
            </View>
          </View>
          <View style={styles.option}>
            <View style={{borderWidth: 0, justifyContent: 'center', width: '15%'}}>
              <Icon name="moon" type="feather" size={30} containerStyle={{marginVertical: 10, alignSelf: 'flex-start', marginLeft: 15, borderColor: "#000"}}/>
            </View> 
            <View style={{borderWidth: 0, justifyContent: 'center', width: '65%'}}>
              <Text style={{color: "#000", fontSize: 20}}>Chế độ tối</Text>
            </View>
            <View style={{width: '20%', justifyContent: 'center', alignItems: 'center', borderWidth: 0}}>
              <Switch
                  trackColor={{ false: " #e6e5e6 ", true: "#66ff99" }}
                  thumbColor={isEnabled ? "#ffffff" : "#cccccc"}
                  onValueChange={ toggleSwitch}
                  value={isEnabled}
                />
            </View>
          </View>
          <View style={styles.option}>
            <View style={{borderWidth: 0, justifyContent: 'center', width: '15%'}}>
              <Icon name="security" type="MaterialCommunityIcons" size={30} containerStyle={{marginVertical: 10, alignSelf: 'flex-start', marginLeft: 15, borderColor: "#000"}}/>
            </View>   
            <View style={{borderWidth: 0, justifyContent: 'center', width: '85%'}}>
              <Text style={{color: "#000", fontSize: 20}}>Đổi mật khẩu</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {backgroundColor: theme.colors.subsubprime, height:'100%', borderTopLeftRadius: 50, borderTopRightRadius: 50},
  avatarContainer: {
    backgroundColor: "#FDEDEB",
    height: 90,
    width: 90,
    alignSelf: "center",
    borderRadius: 100,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  name: {fontSize: 24, textAlign: 'center', fontWeight: '600'},
  role: {color: '#DF3222', fontSize: 20, fontWeight: '500'},
  body: {backgroundColor: '#d9d9d9', position: 'absolute', bottom: 0, height: "75%", width: '100%'},
  option: {flexDirection: 'row', height: 60, width: '100%', backgroundColor: "#fff", borderWidth: 0, marginBottom: 2},
  basicInfo: {width: '100%', height: '25%', alignItems: 'center', justifyContent: 'center', borderWidth: 0}
})