import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Paragraph from '../../components/Paragraph'
import PaperButton from '../../components/Button'
import { Avatar } from 'react-native-elements'
import { Button } from 'react-native-paper'
import { theme } from '../../core/theme'

{/* <Avatar 
rounded title="MD" 
size={120}
containerStyle={{alignSelf: 'center', backgroundColor:'#000', marginTop: 30}}
avatarStyle={{}}/> */}

export default function ProfileScreen({ navigation, route }) {
  console.log(route);
  return (
    // Avatar with Title
    <View style={{backgroundColor: '#fff'}}>

      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar rounded size={90} containerStyle={{backgroundColor: '#F64561', marginTop: 10}}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/481px-Cat03.jpg',
          }}
          />
        </View>
        <View style={styles.infoBox}>
            <Text style={{textAlign: 'center', fontSize: 16, marginBottom: 10, marginTop: 5, fontWeight: '900'}}>Thông tin cá nhân</Text>
            <View style={styles.infoLine}>
              <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 16, width: '25%', fontWeight: '500'}}>Họ và tên: </Text>
              <View style={styles.textBox}>
                <Text style={styles.text}>
                  Trương Nguyễn Khôi Nguyên
                </Text>
              </View>
            </View>
            <View style={styles.infoLine}>
              <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 16, width: '25%', fontWeight: '500'}}>Giới tính: </Text>
              <View style={styles.textBox}>
                <Text style={styles.text}>
                  Nam
                </Text>
              </View>
            </View>
            <View style={styles.infoLine}>
              <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 16, width: '25%', fontWeight: '500'}}>Ngày sinh: </Text>
              <View style={styles.textBox}>
                <Text style={styles.text}>
                  01/01/2002
                </Text>
              </View>
            </View>
            
            <View style={styles.infoLine}>
              <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 16, width: '25%', fontWeight: '500'}}>Phòng ban: </Text>
              <View style={styles.textBox}>
                <Text style={styles.text}>
                  Thiết kế
                </Text>
              </View>
            </View>
            <View style={styles.infoLine}>
              <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 16, width: '25%', fontWeight: '500'}}>Chức vụ: </Text>
              <View style={styles.textBox}>
                <Text style={styles.text}>
                  Content Creator
                </Text>
              </View>
            </View>
        </View>
        
        <View style={styles.infoBox}>
            <Text style={{textAlign: 'center', fontSize: 16, marginBottom: 10, marginTop: 5, fontWeight: '900'}}>Thông tin CCCD</Text>
            <View style={styles.infoLine}>
              <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 16, width: '25%', fontWeight: '500'}}>Số CCCD: </Text>
              <View style={styles.textBox}>
                <Text style={styles.text}>
                  0872020XXXXX
                </Text>
              </View>
            </View>
            <View style={styles.infoLine}>
              <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 16, width: '25%', fontWeight: '500'}}>Ngày cấp: </Text>
              <View style={styles.textBox}>
                <Text style={styles.text}>
                  19/09/2017
                </Text>
              </View>
            </View>
        </View>

        <View style={styles.infoBox}>
            <Text style={{textAlign: 'center', fontSize: 16, marginBottom: 10, marginTop: 5, fontWeight: '900'}}>Thông tin liên lạc</Text>
            <View style={styles.infoLine}>
              <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 16, width: '25%', fontWeight: '500'}}>Điện thoại: </Text>
              <View style={styles.textBox}>
                <Text style={styles.text}>
                  09XXXXXXXX
                </Text>
              </View>
            </View>
            <View style={styles.infoLine}>
              <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 16, width: '25%', fontWeight: '500'}}>Địa chỉ: </Text>
              <View style={styles.textBox}>
                <Text numberOfLines={3} style={styles.text}>
                  123, Lê Đại Hành, Thành phố Hồ Chí Minh, Việt Nam
                </Text>
              </View>
            </View>
            <View style={styles.infoLine}>
              <Text style={{alignSelf: 'flex-start', marginLeft: 10, fontSize: 16, width: '25%', fontWeight: '500'}}>Email: </Text>
              <View style={styles.textBox}>
                <Text style={styles.text}>
                  01/01/2002
                </Text>
              </View>
            </View>
        </View>

        <View style={styles.button}><Text style={styles.buttonText}>Chỉnh sửa các thông tin</Text></View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {backgroundColor: theme.colors.subsubprime, height:'100%', borderTopLeftRadius: 50, borderTopRightRadius: 50},
  avatarContainer: {backgroundColor: "#FDEDEB", height: 110, width: 110, alignSelf: 'center', borderRadius: 100, marginTop: 20, marginBottom: 10, alignItems: 'center',
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 12,
                      },
                      shadowOpacity: 0.58,
                      shadowRadius: 16.00,
                      
                      elevation: 24,},
  avatarName: {marginTop: 10, fontSize: 30, fontFamily: 'Be Vietnam Pro'},
  infoBox: {backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20, marginTop: 10, shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            
            elevation: 9,},
  infoLine: {flexDirection: 'row', marginBottom: 8, marginLeft: 5, marginRight: 5},
  textBox: {borderWidth: 2, borderRadius: 5, borderStyle: 'solid', borderColor: '#000', alignSelf: 'flex-end', width: '70%', fontSize: 16},
  text: {borderColor: '#000', borderStyle: 'solid', marginLeft: 5, overflow: 'hidden', },
  button: {backgroundColor: '#D94545', alignItems: 'center', borderRadius: 20, width: '65%', height: 30, alignSelf: 'center', position: 'absolute', bottom: 0, marginBottom: 30, 
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          
          elevation: 9,},
  buttonText: {fontSize: 20, fontWeight: '500', color: "#fff"}
})

