import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { theme } from "../../core/theme";
import { getDateArray } from "../../helpers/getDate";
import { LineChart } from "react-native-chart-kit";

const env = ["Độ ẩm", "Nhiệt độ", "Độ sáng", "Tiếng ồn"];
const unit = ["%", "°C", "lux", "dB"];
// const timestamp = new Date();
// const dateArray = getDateArray(timestamp);

export default function StatisticDetail({ navigation, route }) {
  const { itemId } = route.params;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(77, 169, 255, ${opacity})`,
      },
    ],
    legend: [env[itemId] + '(' + unit[itemId] + ')'],
  };

  const stats = data.datasets[0].data;
  const sum_ = stats.reduce((acc, val) => acc + val, 0);
  const avg_ = sum_ / stats.length;
  const min_ = Math.min(...stats);
  const max_ = Math.max(...stats);

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
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Thống kê {env[itemId]}</Text>
        <View style={{flex: 1, justifyContent: "flex-end"}}>
          <Icon name="stats-chart-outline" type="ionicon" size={25} color="#000" />
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
              <Text style={styles.statusValue}>{stats[stats.length - 1]}{unit[itemId]}</Text>
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
              <Text style={styles.statusValue}>{avg_}{unit[itemId]}</Text>
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
              <Text style={styles.statusValue}>{max_}{unit[itemId]}</Text>
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
              <Text style={styles.statusValue}>{min_}{unit[itemId]}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // header: {
  //   marginTop: 50,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginHorizontal: "10%",
  //   justifyContent: "space-around",
  //   width: "100%",
  // },
  // headerText: {
  //   fontSize: 20,
  //   fontWeight: "500",
  //   textAlign: "center",
  // },
  // headerBack: {
  //   alignItems: "flex-end",
  //   marginRight: "5%",
  // },
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
