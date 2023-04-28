import React, {useState} from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import Background from "../../components/Background";
import Header from "../../components/Header";

export default function StatisticScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    // <Background>
    //   <Header>DMM</Header>
    // </Background>
    <View style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 15,
          }}
        >
          <Text style={{ flex: 1, fontWeight: 600, fontSize: 16 }}>
            Pasic Office
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Đánh giá
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 15,
          }}
        >
          <Text style={styles.whiteLeftText}>Chỉ số hiện tại</Text>
          <Text style={styles.whiteRightText}>Tốt</Text>
        </View>
      </View>
      <View style={styles.detail}>
        <Text
          style={{
            color: "#fff",
            marginLeft: 15,
            height: "100%",
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          Xem thống kê chi tiết
        </Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "gray",
            }}
          >
            <View style={{ backgroundColor: "white", padding: 20 }}>
              <Text>Hello from Modal!</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{ marginTop: 20 }}
              >
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Icon
          name="chevron-right"
          type="AntDesign"
          color="#fff"
          size={30}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>

      <View style={styles.status}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
            <View style={{}}>
              <View style={{}}>
                <Icon name="droplet" type='feather' size={25} containerStyle={{marginTop: 7}}/>
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Độ ẩm</Text>
              <Text>50%</Text>
            </View>
            <View style={{}}>
              <View style={{}}>
                <Icon name="thermometer" type='feather' size={25} containerStyle={{marginTop: 7}}/>
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Nhiệt độ</Text>
              <Text>30°C</Text>
            </View>
        </View>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C4DAF5",
    height: "30%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  status: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: "50%",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
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
  whiteLeftText: {
    flex: 1,
    color: "white",
    fontWeight: "500",
  },
  whiteRightText: {
    flex: 1,
    textAlign: "right",
    color: "white",
    fontWeight: "500",
  },
  detail: {
    height: 50,
    marginVertical: 20,
    marginRight: "10%",
    flexDirection: "row",
    flex: 1,
    textAlign: "right",
    alignItems: "flex-end",
  },
});
