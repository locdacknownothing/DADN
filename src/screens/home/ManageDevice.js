import React, {useState, useEffect} from "react";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Paragraph from "../../components/Paragraph";
import PaperButton from "../../components/Button";
import { StyleSheet, View, Text, ScrollView, Switch } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { Button } from "react-native-paper";
import { theme } from "../../core/theme";
import { Image } from "react-native-elements";
import { json } from "react-router-dom";
import { and, ceil } from "react-native-reanimated";
import { img_urls, MY_KEY } from "../../core/const";

const NUM_DEVICES = 2

const devices = [
  { id: "1", name: "Đèn văn phòng" },
  { id: "2", name: "Đèn hành lang" },
  { id: "3", name: "Quạt văn phòng" }
  // { id: "4", name: "Device 4" },
  // { id: "5", name: "Device 5" },
  // { id: "6", name: "Device 6" },
  // { id: "7", name: "Device 7" },
  // { id: "8", name: "Device 8" },
  // { id: "9", name: "Device 9" },
  // { id: "10", name: "Device 10" },
];

// const Devices = () => {
//   return (
//     <View style={{ padding: 10 }}>
//       <Text style={{ fontWeight: 'bold' }}>Device List</Text>
//     </View>
//   );
// };

const light_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.offices-light";
const hallways_light_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.hallways-light";
const fan_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.fan";

export default function ManageDevice({ navigation, route }) {
  // console.log(route)
  let name = route.params.name;
  let role = route.params.role;
  // const [isEnabled, setIsEnabled] = useState(Array.from({ length: NUM_DEVICES }, () => false));
  const [fanIconURL, setFanURL] = useState(require('../../assets/fanspeed/level0.png'));
  const [light1, setLight1] = useState(false);
  const [light2, setLight2] = useState(false);
  let isEnabled = [light1, light2];
  const [fanSpeed, setSpeed] = useState(0);
  const toggleSwitch = async (index) => {
    if (index === 0){
      let new_light1 = !light1;
      setLight1(!light1);
      const data = {value: (new_light1*1).toString()};
      const options = {
        method: 'POST',
        headers: {
          'X-AIO-KEY': MY_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      };

      const response = await fetch('https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.offices-light/data/', options)
      const reply = await response.json();
      console.log(reply)
    }
    if (index === 1){
      let new_light2 = !light2;
      setLight2(!light2);
      const data = {value: (new_light2*1).toString()};
      const options = {
        method: 'POST',
        headers: {
          'X-AIO-KEY': MY_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      };

      const response = await fetch('https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.hallways-light/data/', options)
      const reply = await response.json();
      console.log(reply)
    }
    // const newSwitches = [...isEnabled];
    // newSwitches[index] = !newSwitches[index];
    // setIsEnabled(newSwitches);
  }
  const changeFanSpeed = async () => {
    let newFanSpeed = fanSpeed + 25;
    newFanSpeed = newFanSpeed%125;
    setSpeed(newFanSpeed);
    // console.log(newFanSpeed);

    if (newFanSpeed === 0){
      setFanURL(require('../../assets/fanspeed/level0.png'));
    }
    if (newFanSpeed === 25){
      setFanURL(require('../../assets/fanspeed/level1.png'));
    }
    if (newFanSpeed === 50){
      setFanURL(require('../../assets/fanspeed/level2.png'));
    }
    if (newFanSpeed === 75){
      setFanURL(require('../../assets/fanspeed/level3.png'));
    }
    if (newFanSpeed === 100){
      setFanURL(require('../../assets/fanspeed/level4.png'));
    }

    const data = {value: (newFanSpeed).toString()};
    const options = {
      method: 'POST',
      headers: {
        'X-AIO-KEY': MY_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };

    const response = await fetch('https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.fan/data/', options)
    const reply = await response.json();
    console.log(reply)
  }
  const [lightValue, setLightValue] = useState(0);
  const [hallwaysLightValue, setHallwaysLightValue] = useState(0);

  useEffect(() => {
    const myFunc = async() => {
      try {
        const [res1, res2, res3] = await Promise.all([fetch(light_url), fetch(hallways_light_url), fetch(fan_url)]);
        const [json1, json2, json3] = await Promise.all([res1.json(), res2.json(), res3.json()]);
        
        // console.log("Trang thai hien tai cua den van phong: " + json1.last_value + "\nButton state: " + toString(light1))
        if (json1.last_value == "1"){
          setLight1(true);
        }
        else if (json1.last_value == "0"){
          setLight1(false);
        }
        
        // console.log("Trang thai hien tai cua den hanh lang: " + json2.last_value + "\nButton state: " + toString(light2))
        if (json2.last_value == "1"){
          setLight2(true);
        }
        else if (json2.last_value == "0"){
          setLight2(false);
        }

        setSpeed(parseInt(json3.last_value, 10));
        if (json3.last_value == '0'){
          setFanURL(require('../../assets/fanspeed/level0.png'))
        }
        else if (json3.last_value == '25'){
          setFanURL(require('../../assets/fanspeed/level1.png'))
        }
        else if (json3.last_value == '50'){
          setFanURL(require('../../assets/fanspeed/level2.png'))
        }
        else if (json3.last_value == '75'){
          setFanURL(require('../../assets/fanspeed/level3.png'))
        }
        else if (json3.last_value == '100'){
          setFanURL(require('../../assets/fanspeed/level4.png'))
        }

        // console.log("UPDATE");
      }
      catch(err){
        // console.log(err);
      };
    };
    myFunc();
    setInterval(() => {
      myFunc();
    }, 4000);
  }, [])

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.basicInfo}>
          <View style={styles.avatarContainer}>
            <Avatar
              rounded
              size={70}
              containerStyle={{ backgroundColor: "#F64561", marginTop: 10 }}
              source={img_urls[route.params.id]}
            />
          </View>
          <Text style={styles.name}>{name}</Text>
          {
            role ? (<Text style={styles.role}>Quản lý</Text>) : (<Text style={styles.role}>Nhân viên</Text>)
          }
          
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.deviceTitle}>
          <Text style={styles.listName}>Danh sách đèn</Text>
          <View style={styles.deviceIcon}>
            <Icon name="bulb" type="ionicon" size={20} />
          </View>
        </View>
        <View style={styles.status}>
          <ScrollView style={{ height: 3 * 50 }}>
            {devices.slice(0, 2).map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <View style={{borderWidth: 0, width: '80%'}}>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
                <View style ={{justifyContent: 'center', width: '20%', alignItems: 'center'}}>
                  <Switch
                    key={item.id - 1}
                    trackColor={{ false: " #e6e5e6 ", true: "#66ff99" }}
                    thumbColor={isEnabled ? "#ffffff" : "#cccccc"}
                    onValueChange={() => toggleSwitch(item.id - 1)}
                    value={isEnabled[item.id - 1]}
                    style={[styles.itemSwitch]}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.deviceTitle}>
          <Text style={styles.listName}>Danh sách quạt</Text>
          <View style={styles.deviceIcon}>
            <Icon name="wind" type="feather" size={20} />
          </View>
        </View>
        <View style={styles.status}>
          <ScrollView style={{ height: 3 * 50 }}>
            <View key={3} style={styles.itemContainer}>
              <View style={{borderWidth: 0, width: '80%', borderWidth: 0}}>
                <Text style={styles.itemName}>Quạt văn phòng</Text>
              </View>
              <View style ={{justifyContent: 'center', width: '20%', alignItems: 'center'}}>
                <Image source={fanIconURL} onPress={() => changeFanSpeed()} style={{width: 30, height: 33}}/>
              </View>
              {/* <Switch
                key={3}
                trackColor={{ false: " #e6e5e6 ", true: "#66ff99" }}
                thumbColor={isEnabled ? "#ffffff" : "#cccccc"}
                onValueChange={() => toggleSwitch(3)}
                value={isEnabled[item.id - 1]}
                style={styles.itemSwitch}
              /> */}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.subsubprime,
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
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
  name: { fontSize: 24, textAlign: "center", fontWeight: "600"},
  role: { color: "#DF3222", fontSize: 20, fontWeight: "500" },
  body: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    height: "75%",
    width: "100%",
  },
  status: {
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  iconContainer: {
    backgroundColor: "#99CEFF",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    marginBottom: 5,
  },
  statusElement: {
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 15,
    marginLeft: 10,
    marginRight: 9,
  },
  basicInfo: { width: '100%', height: '25%', alignItems: 'center', justifyContent: 'center', borderWidth: 0},
  listName: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 20,
    marginLeft: "10%",
  },
  deviceTitle: {
    flexDirection: "row",
  },
  deviceIcon: {
    flex: 1,
    alignItems: "flex-end",
    marginVertical: 20,
    marginRight: "10%",
  },
  itemContainer: {
    flexDirection: 'row',
    borderWidth: 0
  },
  itemName: {
    fontSize: 18,
    padding: 15,
    fontWeight: "500",
  },
  itemSwitch: {
  },
});
