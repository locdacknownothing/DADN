import React , { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Switch } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import { useParams } from 'react-router-dom'
import { Button } from 'react-native-paper'
import { theme } from '../../core/theme'
import { img_urls } from '../../core/const'

const temp_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.temperature";
const humi_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.humidity";
const brightness_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.brightness";
const noise_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.noise";
const light_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.offices-light";
const hallways_light_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.hallways-light";
const fan_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.fan";

let TIMEOUT_MS = 5000;

export default function HomeScreen({ navigation, route }) {
  console.log(route);
  const img_url = (img_urls[route.params.id]);
  const name = route.params.name;
  const role = route.params.role;
  const roleName = ["Nhân viên", "Quản lý"];

  const [tempValue, setTempValue] = useState(0);
  const [humiValue, setHumiValue] = useState(0);
  const [brightValue, setBrightValue] = useState(0);
  const [noiseValue, setNoiseValue] = useState(0);
  
  const myFunc = async() => {
    try {
      let [data1, data2, data3, data4] = await Promise.all([fetch(temp_url).then(res1 => res1.json()).then(data1 => setTempValue(data1.last_value)),
                                                            fetch(humi_url).then(res2 => res2.json()).then(data2 => setHumiValue(data2.last_value)),
                                                            fetch(brightness_url).then(res3 => res3.json()).then(data3 => setBrightValue(data3.last_value)),
                                                            fetch(noise_url).then(res4 => res4.json()).then(data4 => setNoiseValue(data4.last_value))]);
      // console.log("UPDATE");
    }
    catch(err){
      console.log(err);
    };
  };
  
  useEffect(() => {
    myFunc();

    const intervalFetch = setInterval(() => {
      myFunc();
    }, 3000);

    return () => clearInterval(intervalFetch);
  }, [])

  return (
    <View style={{backgroundColor: "#fff"}}>
      <View style={styles.container}>
      <View style={styles.basicInfo}>
          <View style={styles.avatarContainer}>
            <Avatar rounded size={70} containerStyle={{backgroundColor: '#F64561', marginTop: 10}}
            source={(img_url)}/>
          </View>
          <Text style={styles.name}>
            {name}
          </Text>
          <Text  style={styles.role_}>
            {roleName[role]}
          </Text>
        </View>

        <View style={styles.body}>
          <View style={styles.status}>
            <View style={styles.statusElement}>
              <View style={styles.iconContainer}>
                <Icon name="thermometer" type='feather' size={25} containerStyle={{marginTop: 7}}/>
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Nhiệt độ</Text>
              <Text>{tempValue}°C</Text>
            </View>
            
            <View style={styles.statusElement}>
              <View style={styles.iconContainer}>
                <Icon name="droplet" type='feather' size={25} containerStyle={{marginTop: 7}}/>
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Độ ẩm</Text>
              <Text>{humiValue}%</Text>
            </View>
            
            <View style={styles.statusElement}>
              <View style={styles.iconContainer}>
                <Icon name="bulb" type='ionicon' size={25} containerStyle={{marginTop: 7}}/>
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Ánh sáng</Text>
              <Text>{brightValue}lux</Text>
            </View>
            
            <View style={styles.statusElement}>
              <View style={styles.iconContainer}>
                <Icon name="barcode" type='ionicon' size={25} containerStyle={{marginTop: 7}}/>
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 18}} >Tiếng ồn</Text>
              <Text>{noiseValue}db</Text>
            </View>
          </View>

          <View style={styles.service}>
            <Text style={{marginTop: 20, marginBottom: 10, fontSize: 18, fontWeight: '700', color:'#414141'}}>
              Dịch vụ của tôi
            </Text>
            <View style={styles.serviceButton}>
              <View style={{borderWidth: 0, width: '12%', justifyContent: 'center'}}>
                <Icon name="bulb" type='ionicon' color='#fff' size={25} containerStyle={{}}/>
              </View>
              <View style={{justifyContent: 'center', borderWidth: 0, width: '75%'}}>
                <Text style={{color: "#fff", marginLeft: 15, fontSize: 20, fontWeight: '500'}}>
                  Quản lý thiết bị
                </Text>
              </View>
              <View style={{height: '100%', borderWidth: 0, width: '13%', justifyContent: 'center'}}>
                <Icon name="chevron-right" type="AntDesign" color='#fff' size={30} containerStyle={{}}
                  onPress={() => navigation.navigate('Quản lý thiết bị', {id: route.params.id, name: route.params.name, role: route.params.role})}/>
              </View>
            </View>

            
            <View style={styles.serviceButton}>
              <View style={{borderWidth: 0, width: '12%', justifyContent: 'center'}}>
                <Icon name="calendar" type='feather' color='#fff' size={25} containerStyle={{}}/>
              </View>
              <View style={{justifyContent: 'center', borderWidth: 0, width: '75%'}}>
                <Text style={{color: "#fff", marginLeft: 15, fontSize: 20, fontWeight: '500'}}>
                  Xem bảng chấm công
                </Text>
              </View>
              <View style={{height: '100%', borderWidth: 0, width: '13%', justifyContent: 'center'}}>
                <Icon name="chevron-right" type="AntDesign" color='#fff' size={30} containerStyle={{}}
                  onPress={() => navigation.navigate('Bảng chấm công', {id: route.params.id, name: route.params.name})}/>
              </View>
            </View>

            {role == 1 ? (
              <View>
                <View style={{borderColor: '#3f3f3f', borderWidth: 0, marginTop: 3, marginBottom: 15}}></View>

                <View style={styles.serviceButton}>
                  <View style={{borderWidth: 0, width: '12%', justifyContent: 'center'}}>
                    <Icon name="list" type='feather' color='#fff' size={25} containerStyle={{}}/>
                  </View>
                  <View style={{justifyContent: 'center', borderWidth: 0, width: '75%'}}>
                    <Text style={{color: "#fff", marginLeft: 15, fontSize: 20, fontWeight: '500'}}>
                      Xem danh sách nhân viên
                    </Text>
                  </View>
                  <View style={{height: '100%', borderWidth: 0, width: '13%', justifyContent: 'center'}}>
                    <Icon name="chevron-right" type="AntDesign" color='#fff' size={30} containerStyle={{}}
                      onPress={() => navigation.navigate('Danh sách nhân viên')}/>
                  </View>
                </View>

                <View style={styles.serviceButton}>
                  <View style={{borderWidth: 0, width: '12%', justifyContent: 'center'}}>
                    <Icon name="bar-chart-2" type='feather' color='#fff' size={25} containerStyle={{}}/>
                  </View>
                  <View style={{justifyContent: 'center', borderWidth: 0, width: '75%'}}>
                    <Text style={{color: "#fff", marginLeft: 15, fontSize: 20, fontWeight: '500'}}>
                      Biểu đồ thống kê
                    </Text>
                  </View>
                  <View style={{height: '100%', borderWidth: 0, width: '13%', justifyContent: 'center'}}>
                    <Icon name="chevron-right" type="AntDesign" color='#fff' size={30} containerStyle={{}}
                      onPress={() => navigation.navigate('Biểu đồ thống kê')}/>
                  </View>
                </View>
              </View>
            ): null}
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
  role_: {color: '#DF3222', fontSize: 20, fontWeight: '500'},
  body: {backgroundColor: '#fff', position: 'absolute', bottom: 0, height: '75%', width: '100%'},
  status: {flexDirection: 'row', height: 114, width: '93%', alignSelf: 'center', marginTop: 24, justifyContent: 'center', borderRadius: 15, backgroundColor: '#fff',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            
            elevation: 9,},
  iconContainer: {backgroundColor: theme.colors.subprime, borderRadius: 20, width: 40, height: 40, alignItems: 'center', marginBottom: 5},
  statusElement: {alignItems: 'center', alignSelf: 'flex-start', marginTop: 15, marginLeft: 10, marginRight: 9},
  service: {marginLeft: 30, marginRight: 30},
  serviceButton: {backgroundColor: theme.colors.primary, borderRadius: 10, height: 50, color: '#fff', flexDirection: 'row', width: '100%', marginBottom: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,
                  
                  elevation: 6,},
  basicInfo: {width: '100%', height: '25%', alignItems: 'center', justifyContent: 'center', borderWidth: 0}
})