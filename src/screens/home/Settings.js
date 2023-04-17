import React, {useState} from 'react'
import Background from '../../components/Background'
import Header from '../../components/Header'
import { StyleSheet, View, Text,Switch } from 'react-native'
import { Avatar, Icon} from 'react-native-elements'

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={{backgroundColor: "#fff"}}>
      <View style={styles.container}>
        <View style={styles.basicInfo}>
          <View style={styles.avatarContainer}>
            <Avatar rounded size={70} containerStyle={{backgroundColor: '#F64561', marginTop: 10}}
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/481px-Cat03.jpg',
            }}/>
          </View>
          <Text style={styles.name}>
            Trương Nguyễn Khôi Nguyên
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
            <Text style={{color: "#000", marginVertical: 12, marginLeft: 15, height: '100%', fontSize: 20}}>Ngôn ngữ</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: "#9c9c9c", height: '100%', fontSize: 20, marginLeft: 110, marginVertical: 12,   }}>
                Tiếng Việt
              </Text>
              <View>
                <Icon name="chevron-right" type="AntDesign" size={30} containerStyle={{marginVertical: 11}}/>
              </View>
            </View>
          </View>
          <View style={styles.option}>
            <View>
              <Icon name="moon" type="feather" size={30} containerStyle={{marginVertical: 10, alignSelf: 'flex-start', marginLeft: 15, borderColor: "#000"}}/>
            </View> 
            <Text style={{color: "#000", marginVertical: 12, marginLeft: 15, height: '100%', fontSize: 20}}>Chế độ tối</Text>
            <View style={{marginVertical: 2, marginLeft: 180}}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={useState(false) ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={useState(false)}
              />
            </View>
          </View>
          <View style={styles.option}>
            <View>
              <Icon name="security" type="MaterialCommunityIcons" size={30} containerStyle={{marginVertical: 10, alignSelf: 'flex-start', marginLeft: 15, borderColor: "#000"}}/>
            </View>   
            <Text style={{color: "#000", marginVertical: 12, marginLeft: 15, height: '100%', fontSize: 20}}>Đổi mật khẩu</Text>
            </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#C4DAF5', height:'100%', borderTopLeftRadius: 50, borderTopRightRadius: 50},
  avatarContainer: {backgroundColor: "#FDEDEB", height: 90, width: 90, alignSelf: 'center', borderRadius: 100, marginTop: 15, alignItems: 'center',
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,
                    
                    elevation: 9,},
  name: {fontSize: 24, textAlign: 'center', fontWeight: '600'},
  role: {color: '#DF3222', fontSize: 20, fontWeight: '500'},
  body: {backgroundColor: '#d9d9d9', position: 'absolute', bottom: 0, height: "70%", width: '100%'},
  option: {flexDirection: 'row', width: '100%', backgroundColor: "#fff", height: 50, marginBottom: 2},
  basicInfo: {width: 200, alignItems: 'center', alignSelf: 'center'}
})