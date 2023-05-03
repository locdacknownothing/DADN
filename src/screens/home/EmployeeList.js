import React, { useEffect, useState } from "react";
import Background from "../../components/Background";
import Header from "../../components/Header";
import CalendarStrip from "react-native-calendar-strip";
import { StyleSheet, View, Text } from "react-native";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Avatar, SearchBar, Icon } from "react-native-elements";

export default function EmployeeList({ navigation }) {
  const [cur_day, updateCurr_day] = useState(new Date());
  let customDatesStyles = [
    {
      startDate: cur_day,
      dateContainerStyle: { backgroundColor: "black" },
    },
  ];
  const [searchText, updateSearchText] = useState("");
  const [empName, updateEmpName] = useState("Truong Nguyen Khoi Nguyen");
  const [avatarLink, updateAvatarLink] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/481px-Cat03.jpg"
  );
  const [start_work_time, updateStartWorkTime] = useState("9:00");
  const [end_work_time, updateEndWorkTime] = useState("Hiện tại");
  const [empInfor, updateEmpInfor] = useState([]);
  const getEmpURL = "http://192.168.1.4:5000/attcheck/";
  const tempURL =
    "https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.temperature/data";
  const tempURL2 = "https://reactnative.dev/movies.json";
  const tempURL3 = "http://127.0.0.1:5000/login";

  // fetch(getEmpURL).then(data => data.json()).then(res => updateEmpInfor(res));

  // var request = new XMLHttpRequest();
  // request.onreadystatechange = e => {
  //   if (request.readyState !== 4) {
  //     return;
  //   }

  //   if (request.status === 200) {
  //     console.log('success');
  //     updateEmpInfor(request.responseText);
  //   } else {
  //     console.warn('error');
  //   }
  // };

  // request.open('GET', getEmpURL);
  // request.send();

  // const req = new Request('https://io.adafruit.com/api/v2/Vyvy0812/feeds/pasic-smart-office.temperature/data', {
  //   method: "POST",
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     "id": "string",
  //     "value": "string",
  //     "feed_id": 0,
  //     "feed_key": "string",
  //     "created_at": "datetime",
  //     "location": {},
  //     "lat": 0.0,
  //     "lon": 0.0,
  //     "ele": 0.0,
  //     "created_epoch": 0,
  //     "expiration": "datetime"
  //   }),

  // });
  // fetch(getEmpURL).then(data => data.json()).then(data => updateEmpInfor(data));
  // Take first employee information

  const myFunc = () => {
    try {
      fetch(getEmpURL)
        .then((data) => data.json())
        .then((data) => {
          updateEmpName(data[1].name);
          updateStartWorkTime(data[1].check_in);
          updateEndWorkTime(data[1].check_out);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    myFunc();
  }, []);
  console.log(empName);
  console.log(start_work_time);
  console.log(end_work_time);
  // updateEmpName(empInfor[0].name);

  console.log(searchText);

  const onPressInfo = (empId) => {
    navigation.navigate("EmployeeInfo", { id: empId });
  };

  return (
    <View style={[styles.containerTemp]}>
      <View>
        <CalendarStrip
          scrollable
          style={{ height: 100, paddingBottom: 10 }}
          selectedDate={cur_day}
          calendarColor={"#fff"}
          calendarHeaderStyle={{ color: "#8189B0" }}
          dateNumberStyle={{ color: "#8189B0" }}
          dateNameStyle={{ color: "#8189B0" }}
          iconContainer={{ flex: 0.1 }}
          highlightDateNumberStyle={{ color: "white" }}
          highlightDateNameStyle={{ color: "white" }}
          onDateSelected={(date) => {
            updateCurr_day(date);
          }}
          customDatesStyles={customDatesStyles}
        />
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <SearchBar
            lightTheme
            placeholder="Search for member"
            onChangeText={updateSearchText}
            value={searchText}
            containerStyle={{
              borderRadius: 50,
              height: 50,
              backgroundColor: "#fff",
              borderWidth: 0.5,
              borderColor: "#dfdfdf",
            }}
            inputContainerStyle={{
              borderRadius: 50,
              height: 20,
              backgroundColor: "#fff",
            }}
            inputStyle={{ fontSize: 15 }}
          />
        </View>
      </View>
      <View>
        <View style={styles.empHolder}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.avatarContainer}>
              <Avatar
                rounded
                size={55}
                source={{
                  uri: avatarLink,
                }}
                containerStyle={{ backgroundColor: "#F64561" }}
              ></Avatar>
            </View>
            <View style={styles.userInforHolder}>
              <Text size={16}>{empName}</Text>
              <Text size={12} style={{ color: "#8189B0", fontWeight: "bold" }}>
                {moment.unix(start_work_time).format("h:mm:ss a")} -{" "}
                {moment.unix(end_work_time).format("h:mm:ss a")}
              </Text>
            </View>
            <View
              style={{
                alignSelf: "flex-end",
                width: "10%",
                height: 70,
                justifyContent: "center",
              }}
            >
              <Icon
                size={30}
                name="chevron-right"
                type="feather"
                color="#878997"
                onPress={() => onPressInfo(0)}
              />
              {/* người dùng hiện tại có id là 0 */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: "#FDEDEB",
    height: 70,
    width: 70,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  container: { flex: 1, height: 100 },
  containerTemp: { marginTop: 50 },
  empHolder: {
    height: 80,
    backgroundColor: "#f2f8ff",
    margin: 20,
    borderRadius: 20,
    justifyContent: "center",
  },
  userInforHolder: { alignSelf: "center", marginLeft: 10, width: "66%" },
});
