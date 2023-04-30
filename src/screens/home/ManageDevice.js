import React, {useState} from "react";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Paragraph from "../../components/Paragraph";
import PaperButton from "../../components/Button";
import { StyleSheet, View, Text, ScrollView, Switch } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { Button } from "react-native-paper";
import { theme } from "../../core/theme";

const NUM_DEVICES = 10

const devices = [
  { id: "1", name: "Device 1" },
  { id: "2", name: "Device 2" },
  { id: "3", name: "Device 3" },
  // { id: "4", name: "Device 4" },
  // { id: "5", name: "Device 5" },
  // { id: "6", name: "Device 6" },
  // { id: "7", name: "Device 7" },
  { id: "8", name: "Device 8" },
  { id: "9", name: "Device 9" },
  { id: "10", name: "Device 10" },
];

// const Devices = () => {
//   return (
//     <View style={{ padding: 10 }}>
//       <Text style={{ fontWeight: 'bold' }}>Device List</Text>
//     </View>
//   );
// };

export default function ManageDevice({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(Array.from({ length: NUM_DEVICES }, () => false));
  
  const toggleSwitch = (index) => {
    const newSwitches = [...isEnabled];
    newSwitches[index] = !newSwitches[index];
    setIsEnabled(newSwitches);
  }

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.basicInfo}>
          <View style={styles.avatarContainer}>
            <Avatar
              rounded
              size={70}
              containerStyle={{ backgroundColor: "#F64561", marginTop: 10 }}
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/481px-Cat03.jpg",
              }}
            />
          </View>
          <Text style={styles.name}>Trương Nguyễn Khôi Nguyên</Text>
          <Text style={styles.role}>Employee</Text>
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
            {devices.slice(0, 5).map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Switch
                  key={item.id - 1}
                  trackColor={{ false: " #e6e5e6 ", true: "#66ff99" }}
                  thumbColor={isEnabled ? "#ffffff" : "#cccccc"}
                  onValueChange={() => toggleSwitch(item.id - 1)}
                  value={isEnabled[item.id - 1]}
                  style={styles.itemSwitch}
                />
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
            {devices.slice(5, 10).map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Switch
                  key={item.id - 1}
                  trackColor={{ false: " #e6e5e6 ", true: "#66ff99" }}
                  thumbColor={isEnabled ? "#ffffff" : "#cccccc"}
                  onValueChange={() => toggleSwitch(item.id - 1)}
                  value={isEnabled[item.id - 1]}
                  style={styles.itemSwitch}
                />
              </View>
            ))}
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
    marginTop: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  name: { fontSize: 24, textAlign: "center", fontWeight: "600" },
  role: { color: "#DF3222", fontSize: 20, fontWeight: "500" },
  body: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    height: "70%",
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
  basicInfo: { width: 200, alignItems: "center", alignSelf: "center" },
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
    flex: 1,
    flexDirection: 'row',
  },
  itemName: {
    fontSize: 16,
    padding: 15,
    fontWeight: "500",
  },
  itemSwitch: {
    flex: 1,
    alignItems: "flex-end",
  },
});
