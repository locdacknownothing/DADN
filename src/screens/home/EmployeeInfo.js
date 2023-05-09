import React, { useState, useEffect } from "react";
import Background from '../../components/Background';
import Header from '../../components/Header';
import CalendarStrip from "react-native-calendar-strip";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView
} from "react-native";
import { Icon } from "react-native-elements";
import { theme } from "../../core/theme";
import * as Network from 'expo-network';
import moment from "moment";
import { IPADDRESS } from "../../core/const";
import { LineChart } from "react-native-chart-kit";


export default function EmployeeInfo({ navigation, route }) {
  // console.log(route.params);
  let empInfo = route.params;
  let id = empInfo.id;
  let name = empInfo.name;
  // const [pre_screen_day, setPreDay] = useState(empInfo.day);

  const [cur_day, updateCurr_day] = useState(empInfo.day);
  // console.log(pre_screen_day);
  // const { id } = route.params;
  // let id = 1;
  // let name = 'Khoi Nguyen';
  
  // Link to get infor of through id
  const EmpInforURL = 'http://' + IPADDRESS + '/attcheck/' + (id);

  const [workTime_inWeek, setWeek] = useState(0);
  const [startWeek, setStartWeek] = useState(0);
  const [endWeek, setEndWeek] = useState(0);
  const [norWorHoursWeek, setWeekNormal] = useState(0);
  const [extrWorHoursWeek, setWeekExtra] = useState(0);

  const [restTime, setRest] = useState(0);
  const [workTime, setWork] = useState(0);
  const [norWorHours, setNormal] = useState(0);
  const [extrWorkHours, setExtra] = useState(0);

  const [totalWorkInfo, setTotalWorkInfo] = useState([]);
  // let extrWorkHours = 0;

  const [loading, setLoading] = useState(true);

  const [isNone, setIsNone] = useState(true);
  const [isCheckoutNone, setIsCheckoutNone] = useState(true);

  const [workInfo, setWorkInfo] = useState({});

  const [weekData, setWeekData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const data = {
    labels: labels,
    datasets: [
      {
        data: weekData,
        color: (opacity = 1) => `rgba(77, 169, 255, ${opacity})`,
      },
    ],
    legend: ["Thời gian làm trong tuần"],
  };

  let customDatesStyles = [
    {
      startDate: cur_day,
      dateContainerStyle: { backgroundColor: "black" },
    },
  ];

  const calculateWorkTime = (check_in_time, check_out_time) => {
    let work_normal, work_extra, rest_time, total_work_time = 0;
    if (parseInt(moment.unix(check_in_time).format('HH'), 10) < 12){
      if (parseInt(moment.unix(check_out_time).format('HH'), 10) >= 13){
        rest_time = 3600;
      }
      else if (parseInt(moment.unix(check_out_time).format('HH'), 10) < 12){
        rest_time = 0;
      }
      else{
        let min_rest = parseInt(moment.unix(check_out_time).minutes(), 10);
        let sec_rest = parseInt(moment.unix(check_out_time).seconds(), 10);
        let totalSec_rest = min_rest*60 + sec_rest;

        rest_time = totalSec_rest;
      }
    }
    else if (parseInt(moment.unix(check_in_time).format('HH'), 10) >= 13){
      rest_time = 0;
    }
    else{
      if (parseInt(moment.unix(check_out_time).format('HH'), 10) >= 13){
        let min_rest = parseInt(moment.unix(check_in_time).minutes(), 10);
        let sec_rest = parseInt(moment.unix(check_in_time).seconds(), 10);
        let totalSec_rest = min_rest*60 + sec_rest;
        
        rest_time = 3600 - totalSec_rest;
      }
      else{
        // console.log("here")
        // Total second from time check out to 13:00
        let min_rest_out = parseInt(moment.unix(check_out_time).minutes(), 10);
        let sec_rest_out = parseInt(moment.unix(check_out_time).seconds(), 10);
        let totalSec_rest_out = min_rest_out*60 + sec_rest_out;

        // Total second from 12:00 to time check in
        let min__rest_in = parseInt(moment.unix(check_in_time).minutes(), 10);
        let sec_rest_in = parseInt(moment.unix(check_in_time).seconds(), 10);
        let totalSec_rest_in = min__rest_in*60 + sec_rest_in;
        
        rest_time = totalSec_rest_out - totalSec_rest_in;
      }
    }

    // find work time = (number of seconds from 0 -> check out time) - (number of seconds from 0 -> check in time) 
    let check_in_in_seconds = parseInt(moment.unix(check_in_time).hours(), 10)*3600 + parseInt(moment.unix(check_in_time).minutes(), 10)*60 + parseInt(moment.unix(check_in_time).seconds(), 10)
    let check_out_in_seconds = parseInt(moment.unix(check_out_time).hours(), 10)*3600 + parseInt(moment.unix(check_out_time).minutes(), 10)*60 + parseInt(moment.unix(check_out_time).seconds(), 10)
    total_work_time = check_out_in_seconds - check_in_in_seconds - rest_time
    
    // set normal
    if (parseInt(moment.utc(total_work_time*1000).hours()) >= 8){
      work_extra = (parseInt(moment.utc(total_work_time*1000).hours(), 10) - 8)*3600 + parseInt(moment.utc(total_work_time*1000).minutes(), 10)*60 + parseInt(moment.utc(total_work_time*1000).seconds(), 10)
    }
    else{
      work_extra = 0;
    }
    work_normal = total_work_time - work_extra;

    return [work_normal, work_extra, rest_time, total_work_time];
  }

  const calculateWeekTime = (date, work_per_day) => {
    let total_in_week = 0
    let normal_in_week = 0
    let current_week = moment(new Date(date)).week();
    let week_from = moment(new Date(date)).startOf("week").format("DD/MM")
    let week_to = moment(new Date(date)).endOf("week").format("DD/MM")

    let temp_weekData = [0, 0, 0, 0, 0, 0, 0];
    for (const key in work_per_day){
      if (work_per_day[key].check_out == null) 
        continue;
      if (moment(new Date(key)).week() == current_week){
        let work_time_in_day = calculateWorkTime(work_per_day[key].check_in, work_per_day[key].check_out);
        total_in_week += work_time_in_day[3];
        normal_in_week += work_time_in_day[0]
        temp_weekData[moment(new Date(key)).day()] = work_time_in_day[3];
      }
    }
    setWeekData(temp_weekData);

    return [total_in_week, week_from, week_to, normal_in_week, total_in_week - normal_in_week]
  }

  // console.log(moment(new Date("2023-12-13")).week())

  
  const fetchFunction = async () =>{
    fetch(EmpInforURL)
    .then((data) => data.json())
    .then((json) => {
      setTotalWorkInfo(json);
    })
    .catch((error) => alert(error))
    .finally(() => setLoading(false));;
  };

  useEffect(() => {
    fetchFunction();
    const intervalFetch = setInterval(() => {
      fetchFunction();
    }, 3000)
    return () => clearInterval(intervalFetch);
  },[])
  
  const reset = (date, totalWorkInfo) => {
    let currentDayFormated = moment(date).format('YYYY-MM-DD');
    let workPerDay = {};
    for (let i = 0; i < totalWorkInfo.length; i++){
      let day = totalWorkInfo[i].date;
      workPerDay[day] = totalWorkInfo[i];
    }

    // Total work time in week
    setWeek(calculateWeekTime(date, workPerDay)[0]);
    setStartWeek(calculateWeekTime(date, workPerDay)[1]);
    setEndWeek(calculateWeekTime(date, workPerDay)[2]);
    setWeekNormal(calculateWeekTime(date, workPerDay)[3]);
    setWeekExtra(calculateWeekTime(date, workPerDay)[4]);

    if (workPerDay.hasOwnProperty(currentDayFormated)){
      if (workPerDay[currentDayFormated].check_out !== null){
        setIsCheckoutNone(false);
        setWorkInfo(workPerDay[currentDayFormated]);
        let calculated_time = calculateWorkTime(workPerDay[currentDayFormated].check_in, workPerDay[currentDayFormated].check_out);
        let work_normal = calculated_time[0] 
        let work_extra = calculated_time[1] 
        let rest_time = calculated_time[2] 
        let total_work_time = calculated_time[3] 
  
        setNormal(work_normal);
        setExtra(work_extra);
        setWork(total_work_time);
        setRest(rest_time);
        setIsNone(false);
      }
      else{
        setNormal(0);
        setExtra(0);
        setWork(0);
        setRest(0);
      }
    }
    else{      
      setNormal(0);
      setExtra(0);
      setWork(0);
      setRest(0);
      setIsNone(true);
    }
  }

  useEffect(() => {

    reset(cur_day, totalWorkInfo);
  }, [cur_day, totalWorkInfo])


  return (
      <View style={{backgroundColor: '#fff'}}>

        <View style={styles.containerTemp}>
          <View style={{alignItems: 'center', marginVertical: 5, borderWidth: 0, backgroundColor: '#63c5da', height: 80, justifyContent: 'center'}}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Thông tin chấm công của</Text>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: '#db0f27'}}>{name}</Text>
          </View>
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
                  console.log(cur_day);
                  console.log(totalWorkInfo);
                  // console.log(date);
                }}
                customDatesStyles={customDatesStyles}
            />
          </View>
          
          { loading ? (<Text style={styles.loadingText}>Đang tải thông tin nhân viên ... </Text>) : (
          <ScrollView style={{height: '100%'}}>


            {/* Total Salary Hours */}
            <View style={styles.totalSalaryHours}>
              {/* Title */}
              <View style={{borderWidth: 0, height: 40, justifyContent: 'center', paddingLeft: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Tổng thời gian trả lương trong ngày</Text>
              </View>

              <View style={{flexDirection: 'row', height: 90, borderWidth: 0}}>
                  <View style={{width: '50%', borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, marginVertical: 3}}>Giờ làm bình thường</Text>
                    {
                      (isCheckoutNone || isNone || norWorHours == 0) ? (<Text style={{fontSize: 20, marginVertical: 2, color: '#8189B0', fontWeight: 'bold'}}>--</Text>) : (<Text style={{fontSize: 20, marginVertical: 3, color: '#8189B0', fontWeight: 'bold'}}>{moment.utc(norWorHours*1000).format('HH:mm:ss')}</Text>)
                    }
                  </View>
                  <View style={{width: '50%', borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, marginVertical: 3}}>Giờ làm tăng ca</Text>
                    {
                      (isCheckoutNone || isNone || extrWorkHours == 0) ? (<Text style={{fontSize: 20, marginVertical: 2, color: '#8189B0', fontWeight: 'bold'}}>--</Text>) : (<Text style={{fontSize: 20, marginVertical: 3, color: '#8189B0', fontWeight: 'bold'}}>{moment.utc(extrWorkHours*1000).format('HH:mm:ss')}</Text>)
                    }
                  </View>
              </View>
            </View>

            
            <View style={styles.totalWeek}>
              <View style={styles.totalHours}>
                <View style={{borderWidth: 0, justifyContent: 'center', width: '75%'}}>
                  <Text style={{fontSize: 20, borderWidth: 0, fontWeight: 'bold'}}>
                    Tổng thời gian trong tuần 
                  </Text>
                  <Text style={{fontSize: 20, borderWidth: 0, fontWeight: 'bold'}}>
                    từ {startWeek} - {endWeek}
                  </Text>
                </View>
                <View style={{borderWidth: 0, justifyContent: 'center', width: '25%', alignItems: 'center'}}> 
                  {workTime_inWeek == 0 ? (<Text style={{fontSize: 25, borderWidth: 0, color: '#8189B0', fontWeight: 'bold'}}>--</Text>) : (<Text style={{fontSize: 25, borderWidth: 0, color: '#8189B0', fontWeight: 'bold'}}>{(workTime_inWeek/3600.0).toFixed(2)}h</Text>)}
                </View>
              </View>
                
              <View style={{flexDirection: 'row', height: 70, borderWidth: 0}}>
                  <View style={{width: '50%', borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, marginVertical: 3}}>Giờ làm bình thường</Text>
                    {
                      (norWorHoursWeek == 0) ? (<Text style={{fontSize: 20, marginVertical: 2, color: '#8189B0', fontWeight: 'bold'}}>--</Text>) : (<Text style={{fontSize: 20, marginVertical: 3, color: '#8189B0', fontWeight: 'bold'}}>{(norWorHoursWeek/3600.0).toFixed(2)}h</Text>)
                    }
                  </View>
                  <View style={{width: '50%', borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, marginVertical: 3}}>Giờ làm tăng ca</Text>
                    {
                      (extrWorHoursWeek == 0) ? (<Text style={{fontSize: 20, marginVertical: 2, color: '#8189B0', fontWeight: 'bold'}}>--</Text>) : (<Text style={{fontSize: 20, marginVertical: 3, color: '#8189B0', fontWeight: 'bold'}}>{(extrWorHoursWeek/3600.0).toFixed(2)}h</Text>)
                    }
                  </View>
              </View>

              
              <View style={styles.chartContainer}>
                <LineChart
                  data={data}
                  width={Dimensions.get("window").width*0.9}
                  height={220}
                  chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffff",
                    backgroundGradientTo: "#ffff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  }}
                  bezier
                  formatYLabel={(y_value) => (y_value/3600.0).toFixed(2)}
                  style={styles.chart}
                />
              </View>
            </View>

          </ScrollView>)}
        </View>
      </View>

  )
}

const styles = StyleSheet.create({
  container: { flex: 1, height: 100 },
  containerTemp: {width: '100%', height: '100%', padding: 0, margin: 0, borderColor: '#000', borderWidth: 0},
  totalHours: {height: 80, borderWidth: 0, borderRadius: 10, marginHorizontal: 10, flexDirection: 'row',},
  workingWatch: {height: 200, borderWidth: 0, marginHorizontal: 10, backgroundColor: '#f2f8ff', marginVertical: 15, borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                
                elevation: 6,},
  totalSalaryHours: {borderWidth: 0, marginHorizontal: 10, backgroundColor: '#f2f8ff', marginVertical: 15, borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                
                elevation: 6,},
  loadingText: {alignSelf: 'center',
                fontSize: 20, 
                fontWeight: 'bold',
              color: '#8f8f8f'},
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
  chart: {
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#afafaf'
  },
  totalWeek: {
    backgroundColor: '#f2f8ff',
    borderRadius: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 6,
    marginBottom: 20,
  },  
});
