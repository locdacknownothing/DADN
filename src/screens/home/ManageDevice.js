import React from 'react'
import Background from '../../components/Background'
import Header from '../../components/Header'
import { StyleSheet, View, Text, Switch } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import { Button } from 'react-native-paper'

export default function ManageDevice() {
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
          <View style={styles.status}>
            <View style={styles.statusElement}>
              <View style={styles.iconContainer}>
                <Icon name="thermometer" type='feather' size={25} containerStyle={{marginTop: 7}}/>
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Nhiệt độ</Text>
              <Text>27 độ</Text>
            </View>
            
            <View style={styles.statusElement}>
              <View style={styles.iconContainer}>
                <Icon name="droplet" type='feather' size={25} containerStyle={{marginTop: 7}}/>
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Độ ẩm</Text>
              <Text>50%</Text>
            </View>
            
            <View style={styles.statusElement}>
              <View style={styles.iconContainer}>
                <Icon name="bulb" type='ionicon' size={25} containerStyle={{marginTop: 7}}/>
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Ánh sáng</Text>
              <Text>400 lux</Text>
            </View>
            
            <View style={styles.statusElement}>
              <View style={styles.iconContainer}>
                <Icon name="barcode" type='ionicon' size={25} containerStyle={{marginTop: 7}}/>
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 18}} >Tiếng ồn</Text>
              <Text>50db</Text>
            </View>
          </View>

          <View style={styles.service}>
            <Text style={{marginTop: 10, marginBottom: 10, fontSize: 18, fontWeight: '700', color:'#414141'}}>
              Dịch vụ của tôi
            </Text>
            <View style={styles.serviceButton}>
              <View style={{}}>
                <Icon name="bulb" type='ionicon' color='#fff' size={25} containerStyle={{marginLeft: 10}}/>
              </View>
              <Text style={{color: "#fff", marginLeft: 15, height: '100%', fontSize: 20}}>
                Quản lý thiết bị
              </Text>
              <View>
                <Icon name="chevron-right" type="AntDesign" color='#fff' size={30} containerStyle={{marginLeft: 120}}/>
              </View>
            </View>

            
            <View style={styles.serviceButton}>
              <View style={{}}>
                <Icon name="calendar" type='feather' color='#fff' size={25} containerStyle={{marginLeft: 10}}/>
              </View>
              <Text style={{color: "#fff", marginLeft: 15, height: '100%', fontSize: 20}}>
                Xem bảng chấm công
              </Text>
              <View>
                <Icon name="chevron-right" type="AntDesign" color='#fff' size={30} containerStyle={{marginLeft: 58}}/>
              </View>
            </View>

            <View style={{borderColor: '#3f3f3f', borderWidth: 1, marginTop: 3, marginBottom: 15}}></View>

            <View style={styles.serviceButton}>
              <View style={{}}>
                <Icon name="list" type='feather' color='#fff' size={25} containerStyle={{marginLeft: 10}}/>
              </View>
              <Text style={{color: "#fff", marginLeft: 15, height: '100%', fontSize: 20}}>
                Xem danh sách nhân viên
              </Text>
              <View>
                <Icon name="chevron-right" type="AntDesign" color='#fff' size={30} containerStyle={{marginLeft: 25}}/>
              </View>
            </View>
            
            <View style={styles.serviceButton}>
              <View style={{}}>
                <Icon name="bar-chart-2" type='feather' color='#fff' size={25} containerStyle={{marginLeft: 10}}/>
              </View>
              <Text style={{color: "#fff", marginLeft: 15, height: '100%', fontSize: 20}}>
                Biểu đồ thống kê
              </Text>
              <View>
                <Icon name="chevron-right" type="AntDesign" color='#fff' size={30} containerStyle={{marginLeft: 103}}/>
              </View>
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
  body: {backgroundColor: '#fff', position: 'absolute', bottom: 0, height: "75%", width: '100%'},
  status: {flexDirection: 'row', borderColor: '#000', borderWidth: 2, height: 114, width: '93%', alignSelf: 'center', marginTop: 24, justifyContent: 'center', borderRadius: 15},
  iconContainer: {backgroundColor: '#99CEFF', borderRadius: 20, width: 40, height: 40, alignItems: 'center', marginBottom: 5},
  statusElement: {alignItems: 'center', alignSelf: 'flex-start', marginTop: 15, marginLeft: 10, marginRight: 9},
  service: {marginLeft: 30, marginRight: 30},
  serviceButton: {backgroundColor: '#495867', borderRadius: 10, height: 50, color: '#fff', flexDirection: 'row', paddingTop: 10, width: '100%', marginBottom: 10}
})