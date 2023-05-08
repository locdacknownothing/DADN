import React, { useEffect, useState } from "react";
import CalendarStrip from "react-native-calendar-strip";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import moment from "moment";
import { Avatar, SearchBar, Icon } from "react-native-elements";
import { IPADDRESS, img_urls } from "../../core/const";


export default function EmployeeList({ navigation }) {
  // Preset for calendar
  
  const [cur_day, updateCurr_day] = useState(new Date());
  let customDatesStyles = [
    {
      startDate: cur_day,
      dateContainerStyle: { backgroundColor: "black" },
    },
  ];

  // let week = moment(cur_day).week()
  // console.log(week)  

  const [searchText, updateSearchText] = useState("");
  
  const getEmpURL = "http://" + IPADDRESS + "/attcheck/";

  const [dataSource, setDatasource] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkRepeat = (json, dataSource) => {
    let isRepeat = true;
    if (json.length != dataSource.length)
      return false;
    for (let i = 0; i < json.length; i++){
      if (json[i].check_out != dataSource[i].check_out)
        isRepeat = false;
      if (json[i].check_in != dataSource[i].check_in)
        isRepeat = false;
      if (!isRepeat)
        break
    }
    return isRepeat;
  }

  const fetchFunction = async () => {
    // setLoading(true);
    fetch(getEmpURL)
    .then((response) => response.json())
    .then((json) => {
      setDatasource(json);
    })
    .catch((error) => console.log(error))
    .finally(() => setLoading(false))
  };

  useEffect(() => {
    setRealData(processEmpInfo(dataSource, cur_day))
  }, [dataSource, cur_day, searchText])

  useEffect(() => {
    fetchFunction();
    const intervalFetch = setInterval(() => {
      fetchFunction();
    }, 3000)

    return () => clearInterval(intervalFetch)
  }, [])

  const onPressInfo = (empInfo) => {
    navigation.navigate("EmployeeInfo", { id: empInfo.id, name: empInfo.name, day: cur_day });
  };

  const [realData, setRealData] = useState([]);

  const reset = (date) =>{
    updateCurr_day(date);
  };

  // Process Employee Information function -> Because the data's key from server duplicated -> must be process before put to component
  const processEmpInfo = (dataSource_param, today) => {
    let newDataSource = [];
    let workDate = {};
    let empList = {};
    for (let i = 0; i < dataSource_param.length; i++){
      // Process the date
      let day = moment.unix(dataSource_param[i].check_in).format('DD/MM/YYYY');
      if (workDate.hasOwnProperty(day)){
        workDate[day].push(dataSource_param[i]);
      }
      else{
        workDate[day] = [dataSource_param[i]];
      }

      // Process employee information
      let isExist = false;
      // console.log(newDataSource)
      for (let j = 0; j < newDataSource.length; j++){
        if (newDataSource[j].id == dataSource_param[i].id){
          isExist = true;
          break;
        }
      }
      if (isExist) continue;
      let newEle = {check_in: null, check_out: null, id: dataSource_param[i].id, name: dataSource_param[i].name};
      empList[dataSource_param[i].id] = newEle;
      newDataSource.push(newEle);
    }
    
    let current_day = moment(today).format('DD/MM/YYYY');
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
      finalRes.push(empList[key]);
    }

    filter_result = []
    if (searchText){
      for (let i = 0; i < finalRes.length; i++){
        let empName = finalRes[i].name;
        if (empName.toUpperCase().indexOf(searchText.toUpperCase()) > -1){
          filter_result.push(finalRes[i]);
        }
      }
      // console.log(searchText)
    }
    else{
      // console.log("no text")
      filter_result = finalRes;
    }
  
    // console.log(finalRes);
    return filter_result;
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
              {loading ? (<Text style={styles.loadingText}>Loading .....</Text>) : (
                  realData.map((empInfo, index) => (
                    <View style={styles.empHolder}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.avatarContainer}>
                          <Avatar
                            rounded
                            size={55}
                            source={img_urls[empInfo.id]}
                            containerStyle={{ backgroundColor: "#F64561" }}
                          ></Avatar>
                        </View>
                        <View style={styles.userInforHolder}>
                          <Text size={16}>{empInfo.name}</Text>
                          <Text size={12} style={{ color: "#8189B0", fontWeight: "bold" }}>
                            {empInfo.check_in != null ? moment.unix(empInfo.check_in).format("h:mm:ss a") : "--"} -{" "}
                            {(empInfo.check_out != null) ? moment.unix(empInfo.check_out).format("h:mm:ss a") : "--"}
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
  scrollView: {backgroundColor: 'white', height: 570},
  loadingText: {alignSelf: 'center',
                fontSize: 20, 
                fontWeight: 'bold',
              color: '#8f8f8f'}
});
