import React, { useEffect, useState } from "react";
import Background from "../../components/Background";
import Header from "../../components/Header";
import CalendarStrip from "react-native-calendar-strip";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Avatar, SearchBar, Icon } from "react-native-elements";
import { json } from "react-router-dom";
import { ColorSpace, set } from "react-native-reanimated";
import { CurrentRenderContext } from "@react-navigation/native";
import AuthStackNavigator from "../../navigators/AuthStackNavigator";

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
  // const [empInfor, updateEmpInfor] = useState([]);
  const getEmpURL = "http://192.168.31.17:5000/attcheck/";

  const [dataSource, setDatasource] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const filterEmpArr = (json) => {
    let processedArr = [];
    for (let i = 0; i < json.length; i++){
      ;
    }
  };

  // Take first employee information
  // useEffect(() => {
  //   fetch(getEmpURL)
  //   .then((data) => data.json())
  //   .then((json) => setDatasource(json))
  //   .catch((error) => console.log(error))
  //   .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    const fetchFunction = async () => {
      try{
        const response = await fetch(getEmpURL);
        const json = await response.json();

        setDatasource(json);
        setLoading(false);
      } catch(err){
        console.log(err)
      }
    };
    fetchFunction();
    setInterval(() => {
      fetchFunction();
    }, 10000)

  }, [])

  console.log(moment.unix(1682907239).format("DD/MM/YYYY h:mm:ss a"));

  const onPressInfo = (empInfo) => {
    navigation.navigate("EmployeeInfo", { id: empInfo.id, name: empInfo.name, day: cur_day });
  };

  const [realData, setRealData] = useState([]);

  const reset = (date) =>{
    updateCurr_day(date);
    // processEmpInfo();
    setRealData(processEmpInfoRes(date));
  };

  const processEmpInfoRes = (day) => {
    let newDataSource = [];
    let workDate = {};
    let empList = {};
    for (let i = 0; i < dataSource.length; i++){
      // Process the date
      let day = moment.unix(dataSource[i].check_in).format('DD/MM/YYYY');
      if (workDate.hasOwnProperty(day)){
        workDate[day].push(dataSource[i]);
      }
      else{
        workDate[day] = [dataSource[i]];
      }

      // Process employee information
      let isExist = false;
      // console.log(newDataSource)
      for (let j = 0; j < newDataSource.length; j++){
        if (newDataSource[j].id == dataSource[i].id){
          isExist = true;
          // console.log("exists");
          break;
        }
      }
      if (isExist) continue;
      let newEle = {check_in: 0, check_out: 0, id: dataSource[i].id, name: dataSource[i].name};
      empList[dataSource[i].id] = newEle;
      newDataSource.push(newEle);

    }
    // console.log(newDataSource);
    // console.log(workDate);
    
    let current_day = moment(day).format('DD/MM/YYYY');
    if (workDate.hasOwnProperty(current_day)){
      let curWorkDate = workDate[current_day];
      for (let i = 0; i < curWorkDate.length; i++){
        // console.log(curWorkDate[i])
        empList[curWorkDate[i].id].check_in = curWorkDate[i].check_in;
        empList[curWorkDate[i].id].check_out = curWorkDate[i].check_out;
      }
    }

    let finalRes = [];
    for (const key in empList){
      if (empList[key].check_in != 0){
        finalRes.push(empList[key])
      }
      else{
        // empList[key].check_in = null;
        // empList[key].check_out = null;
        // finalRes.push(empList[key]);
      }
    }
    // useEffect(() => setRealData(finalRes), []);
    // console.log(empList);
    return finalRes;
  }

  const processEmpInfo = () => {
    let newDataSource = [];
    let workDate = {};
    let empList = {};
    for (let i = 0; i < dataSource.length; i++){
      // Process the date
      let day = moment.unix(dataSource[i].check_in).format('DD/MM/YYYY');
      if (workDate.hasOwnProperty(day)){
        workDate[day].push(dataSource[i]);
      }
      else{
        workDate[day] = [dataSource[i]];
      }

      // Process employee information
      let isExist = false;
      // console.log(newDataSource)
      for (let j = 0; j < newDataSource.length; j++){
        if (newDataSource[j].id == dataSource[i].id){
          isExist = true;
          // console.log("exists");
          break;
        }
      }
      if (isExist) continue;
      let newEle = {check_in: 0, check_out: 0, id: dataSource[i].id, name: dataSource[i].name};
      empList[dataSource[i].id] = newEle;
      newDataSource.push(newEle);

    }
    // console.log(newDataSource);
    // console.log(workDate);
    
    let current_day = moment(cur_day).format('DD/MM/YYYY');
    if (workDate.hasOwnProperty(current_day)){
      let curWorkDate = workDate[current_day];
      for (let i = 0; i < curWorkDate.length; i++){
        // console.log(curWorkDate[i])
        empList[curWorkDate[i].id].check_in = curWorkDate[i].check_in;
        empList[curWorkDate[i].id].check_out = curWorkDate[i].check_out;
      }
    }

    let finalRes = [];
    for (const key in empList){
      if (empList[key].check_in != 0){
        finalRes.push(empList[key])
      }
      else{
        // empList[key].check_in = null;
        // empList[key].check_out = null;
        // finalRes.push(empList[key]);
      }
    }
    useEffect(() => setRealData(finalRes), []);
  }

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
            reset(date);
            // processEmpInfo;
          }}
          customDatesStyles={customDatesStyles}
        />
        <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10, marginBottom: 5 }}>
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
        <ScrollView style={styles.scrollView}>
              {loading ? (<Text>Loading .....</Text>) : (
                  realData.map((empInfo) => (
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
                          <Text size={16}>{empInfo.name}</Text>
                          <Text size={12} style={{ color: "#8189B0", fontWeight: "bold" }}>
                            {moment.unix(empInfo.check_in).format("h:mm:ss a")} -{" "}
                            {moment.unix(empInfo.check_out).format("h:mm:ss a")}
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
                            onPress={() => onPressInfo(empInfo)}
                          />
                          {/* người dùng hiện tại có id là 0 */}
                        </View>
                      </View>
                    </View>
                  ))
                )
                
              }
        </ScrollView>
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
  containerTemp: { marginTop: 0, backgroundColor: '#fff', height: '100%' },
  empHolder: {
    height: 80,
    backgroundColor: "#f2f8ff",
    margin: 5,
    borderRadius: 20,
    justifyContent: "center",
  },
  userInforHolder: { alignSelf: "center", marginLeft: 10, width: "66%" },
  scrollView: {backgroundColor: 'white', height: 570}
});
