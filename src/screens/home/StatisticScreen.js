import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import { Icon } from "react-native-elements";
import { theme } from "../../core/theme";
import { getDateArray } from "../../helpers/getDate";
import { evaluateEnvironment } from "../../helpers/evalEnv";

export default function StatisticScreen({ navigation }) {
  const timestamp = new Date();
  const dateArray = getDateArray(timestamp);

  const [modalVisible, setModalVisible] = useState(false);
  const onPressItem = (id) => {
    setModalVisible(!modalVisible);
    navigation.navigate("StatisticDetail", { itemId: id });
  };
  
  const temp_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.temperature";
  const humi_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.humidity";
  const brightness_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.brightness";
  const noise_url = "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.noise";

  const [tempValue, setTempValue] = useState(0);
  const [humiValue, setHumiValue] = useState(0);
  const [brightValue, setBrightValue] = useState(0);
  const [noiseValue, setNoiseValue] = useState(0);
  const RESET_TIME = 3000;

  useEffect(() => {
    const fetchFunction = async() => {
      try {
        await Promise.all([fetch(temp_url).then(res1 => res1.json()).then(data1 => setTempValue(data1.last_value)),
                          fetch(humi_url).then(res2 => res2.json()).then(data2 => setHumiValue(data2.last_value)),
                          fetch(brightness_url).then(res3 => res3.json()).then(data3 => setBrightValue(data3.last_value)),
                          fetch(noise_url).then(res4 => res4.json()).then(data4 => setNoiseValue(data4.last_value))]);
      }
      catch(err){
        console.log(err);
      };
    };
    fetchFunction();
    const intervalFetch = setInterval(() => {
      fetchFunction();
    }, RESET_TIME);

    return () => clearInterval(intervalFetch);
  }, [])

  const evals = evaluateEnvironment(humiValue, tempValue, brightValue, noiseValue);

  return (
    <ScrollView style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={styles.container}>
        <View style={styles.childContainer}>
          <Text style={styles.containerText}>Pasic Office</Text>
          <Text style={styles.whiteContainerText}>Chỉ số môi trường</Text>
        </View>
        <View style={styles.childContainer}>
          <Text style={styles.containerText}>Đánh giá</Text>
          <Text style={styles.whiteContainerText}>{evals}</Text>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.dateContainer}>
        <Icon
          name="calendar-outline"
          type="ionicon"
          size={20}
          color={theme.colors.secondary}
        />
        <Text style={styles.dateText}>
          {" "}
          {dateArray[0]}, Ngày {dateArray[1]} tháng {dateArray[2]} năm{" "}
          {dateArray[3]}
        </Text>
      </View>

      <Text style={styles.sectionText}>Thống kê hiện tại</Text>

      <View style={styles.status}>
        <View style={{ flexDirection: "row", padding: 20 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <View style={{}}>
              <Icon name="droplet" type="feather" size={25} color="#fff" />
            </View>
            <Text style={styles.statusName}>Độ ẩm</Text>
            <View style={styles.statusCircle}>
              <Text style={styles.statusValue}>{humiValue}%</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View style={{}}>
              <Icon name="thermometer" type="feather" size={25} color="#fff" />
            </View>
            <Text style={styles.statusName}>Nhiệt độ</Text>
            <View style={styles.statusCircle}>
              <Text style={styles.statusValue}>{tempValue}°C</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", padding: 20 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <View style={{}}>
              <Icon name="bulb" type="ionicon" size={25} color="#fff" />
            </View>
            <Text style={styles.statusName}>Độ sáng</Text>
            <View style={styles.statusCircle}>
              <Text style={styles.statusValue}>{brightValue}lux</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View style={{}}>
              <Icon name="barcode" type="ionicon" size={25} color="#fff" />
            </View>
            <Text style={styles.statusName}>Tiếng ồn</Text>
            <View style={styles.statusCircle}>
              <Text style={styles.statusValue}>{noiseValue}dB</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.detailView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => onPressItem(0)}
            >
              <Text style={styles.modalText}>Độ ẩm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressItem(1)}
            >
              <Text style={styles.modalText}>Nhiệt độ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressItem(2)}
            >
              <Text style={styles.modalText}>Độ sáng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressItem(3)}
            >
              <Text style={styles.modalText}>Tiếng ồn</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Text style={styles.sectionText}>Thống kê chi tiết</Text>
        <Icon
          name="chevron-right"
          type="feather"
          size={30}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth * 5,
    marginTop: "5%",
    marginHorizontal: "5%",
  },
  container: {
    backgroundColor: theme.colors.primary,
    height: 140,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    margin: "5%",
    marginBottom: 0,
    alignItems: "center",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  childContainer: {
    alignContent: "space-between",
    paddingVertical: "10%",
  },
  whiteContainerText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 24,
    color: "#fff",
  },
  containerText: {
    flex: 1,
    fontWeight: "600",
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "10%",
    marginTop: "5%",
  },
  dateText: {
    fontWeight: "500",
    fontSize: 16,
    color: theme.colors.secondary,
  },
  detailView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5%",
  },
  modalView: {
    backgroundColor: "#fff",
    width: 140,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 20,
    position: "absolute",
    top: "80%",
    right: "5%",
  },
  status: {
    width: "90%",
    paddingVertical: 10,
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  statusName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  statusCircle: {
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 5,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  statusValue: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 700,
  },
  sectionText: {
    fontWeight: "600",
    fontSize: 20,
    marginLeft: "10%",
    marginVertical: "5%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    padding: "5%",
  },
});
