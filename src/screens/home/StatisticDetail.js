import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { theme } from "../../core/theme";
import { getDateArray } from "../../helpers/getDate";
import { LineChart } from "react-native-chart-kit";
import Background from "../../components/Background";
import Header from "../../components/Header";

const env = ["Độ ẩm", "Nhiệt độ", "Độ sáng", "Tiếng ồn"];
const unit = ["%", "\n°C", "\nlux", "\ndB"];
// const timestamp = new Date();
// const dateArray = getDateArray(timestamp);

const getValuesFromJson = (data) => {
  if (data === undefined) {
    console.log(data);
    return [];
  }

  // data = JSON.parse(data).map(obj => ({...obj}));
  data_values = [];
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i].value);
    data_values.push(data[i].value);
  }

  return data_values.slice().reverse();
};

function waitForVariable(variableName) {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (window[variableName] !== undefined) {
        clearInterval(intervalId);
        resolve(window[variableName]);
      }
    }, 1000);
  });
}

export default function StatisticDetail({ navigation, route }) {
  const { itemId } = route.params;
  const url_type = ["humidity", "temperature", "brightness", "noise"];
  const data_url =
    "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office." +
    url_type[itemId] +
    "/data/";

  const [value, setValue] = useState([0]);
  const RESET_TIME = 10000;

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const response = await fetch(data_url);
        const json = await response.json();

        setValue(getValuesFromJson(json));
      } catch (err) {
        console.log(err);
      }
    };

    fetchFunction();
    setInterval(() => {
      fetchFunction();
    }, RESET_TIME);
  }, []);

  if (!value) {
    return (
      <Background>
        <Header>Đang tải dữ liệu ...</Header>
      </Background>
    );
  }

  const stats = [];
  const labels = [];
  for (let i = 0; i < value.length; i++) {
    // if (i % 10 === 0 || i === 99) {
    if (i % 3 === 0 || i === value.length - 1) {
      stats.push(value[i]);
    }
    if (i % 9 === 0 || i === 99) {
      labels.push(i);
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        data: stats,
        color: (opacity = 1) => `rgba(77, 169, 255, ${opacity})`,
      },
    ],
    legend: [env[itemId] + "(" + unit[itemId] + ")"],
  };
  const present = value[value.length - 1];
  const avg_ = value.reduce((acc, val) => acc + parseInt(val), 0) / 100;
  // const min_ = 0;
  // const max_ = 0;
  const min_ = Math.min(...value);
  const max_ = Math.max(...value);

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Thống kê {env[itemId]}</Text>
        <View style={styles.headerBack}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/arrow_back.png")}
            />
          </TouchableOpacity>
        </View>
      </View> */}
      {/* <Text>{value}{"\n"}{value_}</Text> */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Thống kê {env[itemId]}</Text>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Icon
            name="stats-chart-outline"
            type="ionicon"
            size={25}
            color="#000"
          />
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={Dimensions.get("window").width * 0.9}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(77, 169, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.status}>
        <View style={{ flexDirection: "row", padding: 20 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Text style={styles.statusName}>Hiện tại</Text>
            <View style={styles.statusCircle}>
              <Text style={styles.statusValue}>
                {present}
                {unit[itemId]}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.statusName}>Trung bình</Text>
            <View style={styles.statusCircle}>
              <Text style={styles.statusValue}>
                {avg_}
                {unit[itemId]}
              </Text>
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
            <Text style={styles.statusName}>Cao nhất</Text>
            <View style={styles.statusCircle}>
              <Text style={styles.statusValue}>
                {max_}
                {unit[itemId]}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.statusName}>Thấp nhất</Text>
            <View style={styles.statusCircle}>
              <Text style={styles.statusValue}>
                {min_}
                {unit[itemId]}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: "row",
    margin: "5%",
  },
  sectionText: {
    fontWeight: "500",
    fontSize: 20,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    width: "90%",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  horizontalLine: {
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth * 5,
    marginVertical: "5%",
    marginHorizontal: "5%",
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
});
