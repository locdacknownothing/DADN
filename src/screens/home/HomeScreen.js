import React from 'react'
import Background from '../../components/Background'
import Header from '../../components/Header'
import { StyleSheet, View, Text, Switch } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import { Button } from 'react-native-paper'
import { useState, useEffect } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const temp_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.temperature";
const humi_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.humidity";
const brightness_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.brightness";
const noise_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.noise";
const light_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.offices-light";
const hallways_light_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.hallways-light";
const fan_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.fan";

let TIMEOUT_MS = 5000;

export default function HomeScreen({navigation}) {
  const [tempValue, setTempValue] = useState(0);
  const [humiValue, setHumiValue] = useState(0);
  const [brightValue, setBrightValue] = useState(0);
  const [noiseValue, setNoiseValue] = useState(0);
  const [lightValue, setLightValue] = useState(0);
  const [hallwaysLightValue, setHallwaysLightValue] = useState(0);
  const [fanValue, setFanValue] = useState(0);

  useEffect(() => {
    const myFunc = async() => {
      try {
        let [data1, data2, data3, data4] = await Promise.all([fetch(temp_url).then(res1 => res1.json()).then(data1 => setTempValue(data1.last_value)),
                                                              fetch(humi_url).then(res2 => res2.json()).then(data2 => setHumiValue(data2.last_value)),
                                                              fetch(brightness_url).then(res3 => res3.json()).then(data3 => setBrightValue(data3.last_value)),
                                                              fetch(noise_url).then(res4 => res4.json()).then(data4 => setNoiseValue(data4.last_value))]);
        // let [data1, data2, data3, data4] = [res1.json(), res2.json(), res3.json(), res4.json()];
        // let [] = await Promise.all([setTempValue(data1.last_value),
        // setHumiValue(data2.last_value),
        // setBrightValue(data3.last_value),
        // setNoiseValue(data4.last_value)])
        // setLightValue(data5.last_value);
        // setHallwaysLightValue(data6.last_value);
        // setFanValue(data7.last_value);
        console.log("UPDATE");
      }
      catch(err){
        console.log(err);
      };
    };
    myFunc();
    setInterval(() => {
      myFunc();
    }, 10000);

    // setInterval(() => {
      // Promise.all([
      //   fetch(temp_url),
      //   fetch(humi_url),
      //   fetch(brightness_url),
      //   fetch(noise_url),
      //   // fetch(light_url),
      //   // fetch(hallways_light_url),
      //   // fetch(fan_url)
      // ])
      // .then(([res1, 
      //   res2, 
      //   res3, 
      //   res4, 
      //   // res5, 
      //   // res6, 
      //   // res7
      // ]) =>
      //   Promise.all([res1.json(), 
      //     res2.json(), 
      //     res3.json(), 
      //     res4.json(), 
      //     // res5.json(), 
      //     // res6.json(), 
      //     // res7.json()
      //   ])
      // )
      // .then(([data1, data2, data3, data4, data5, data6, data7]) => {
      //   setTempValue(data1.last_value);
      //   setHumiValue(data2.last_value);
      //   setBrightValue(data3.last_value);
      //   setNoiseValue(data4.last_value);
      //   // setLightValue(data5.last_value);
      //   // setHallwaysLightValue(data6.last_value);
      //   // setFanValue(data7.last_value);
      //   console.log("UPDATE");
      // })
    // }, 20000)
  })

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
              <View style={{}}>
                <Icon name="bulb" type='ionicon' color='#fff' size={25} containerStyle={{marginLeft: 10}}/>
              </View>
              <Text style={{color: "#fff", marginLeft: 15, height: '100%', fontSize: 20, fontWeight: '500'}}>
                Quản lý thiết bị
              </Text>
              <View>
                <Icon name="chevron-right" type="AntDesign" color='#fff' size={30} containerStyle={{marginLeft: 120}}
                  onPress={() => navigation.navigate('Quản lý thiết bị')}/>
              </View>
            </View>

            
            <View style={styles.serviceButton}>
              <View style={{}}>
                <Icon name="calendar" type='feather' color='#fff' size={25} containerStyle={{marginLeft: 10}}/>
              </View>
              <Text style={{color: "#fff", marginLeft: 15, height: '100%', fontSize: 20, fontWeight: '500'}}>
                Xem bảng chấm công
              </Text>
              <View>
                <Icon name="chevron-right" type="AntDesign" color='#fff' size={30} containerStyle={{marginLeft: 58}}
                  onPress={() => navigation.navigate('Bảng chấm công')}/>
              </View>
            </View>

            <View style={{borderColor: '#3f3f3f', borderWidth: 1, marginTop: 3, marginBottom: 15}}></View>

            <View style={styles.serviceButton}>
              <View style={{}}>
                <Icon name="list" type='feather' color='#fff' size={25} containerStyle={{marginLeft: 10}}/>
              </View>
              <Text style={{color: "#fff", marginLeft: 15, height: '100%', fontSize: 20, fontWeight: '500'}}>
                Xem danh sách nhân viên
              </Text>
              <View>
                <Icon name="chevron-right" type="AntDesign" color='#fff' size={30} containerStyle={{marginLeft: 25}}
                  onPress={() => navigation.navigate('Danh sách nhân viên')}/>
              </View>
            </View>
            
            <View style={styles.serviceButton}>
              <View style={{}}>
                <Icon name="bar-chart-2" type='feather' color='#fff' size={25} containerStyle={{marginLeft: 10}}/>
              </View>
              <Text style={{color: "#fff", marginLeft: 15, height: '100%', fontSize: 20, fontWeight: '500'}}>
                Biểu đồ thống kê
              </Text>
              <View>
                <Icon name="chevron-right" type="AntDesign" color='#fff' size={30} containerStyle={{marginLeft: 103}}
                  onPress={() => navigation.navigate('Biểu đồ thống kê')}/>
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
  body: {backgroundColor: '#fff', position: 'absolute', bottom: 0, height: "71%", width: '100%'},
  status: {flexDirection: 'row', height: 114, width: '93%', alignSelf: 'center', marginTop: 24, justifyContent: 'center', borderRadius: 15, backgroundColor: '#fff',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            
            elevation: 9,},
  iconContainer: {backgroundColor: '#99CEFF', borderRadius: 20, width: 40, height: 40, alignItems: 'center', marginBottom: 5},
  statusElement: {alignItems: 'center', alignSelf: 'flex-start', marginTop: 15, marginLeft: 10, marginRight: 9},
  service: {marginLeft: 30, marginRight: 30},
  serviceButton: {backgroundColor: '#495867', borderRadius: 10, height: 50, color: '#fff', flexDirection: 'row', paddingTop: 10, width: '100%', marginBottom: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,
                  
                  elevation: 6,},
  basicInfo: {width: 200, alignItems: 'center', alignSelf: 'center'}
})