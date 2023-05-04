import React, { useState, useEffect } from "react";
import Background from '../../components/Background';
import Header from '../../components/Header';
import CalendarStrip from "react-native-calendar-strip";
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
} from "react-native";
import { Icon } from "react-native-elements";
import { theme } from "../../core/theme";
import * as Network from 'expo-network';
import moment from "moment";
import { FlatList } from "react-native-gesture-handler";
import { cos, set } from "react-native-reanimated";

export default function TimesheetScreen({navigation, route}) {
  // console.log(route);
  const  user  = route.params;
  
  // Link to get infor of through id
  
  // console.log(user);
  let id = user.id;
  let name = user.name;
  let totalHours = 2400;
  const baseURL = 'http://192.168.31.17:5000/attcheck/';
  const [restTime, setRest] = useState(0);
  const [workTime, setWork] = useState(0);
  const [norWorHours, setNormal] = useState(0);
  const [extrWorkHours, setExtra] = useState(0);

  const [totalWorkInfo, setTotalWorkInfo] = useState([]);

  const [cur_day, updateCurr_day] = useState(new Date());
  let customDatesStyles = [
    {
      startDate: cur_day,
      dateContainerStyle: { backgroundColor: "black" },
    },
  ];

  const [isNone, setIsNone] = useState(true);

  const [workInfo, setWorkInfo] = useState({});

  let empInfoURL = baseURL.concat(id); 

  // console.log(empInfoURL)

  useEffect(() => {
    const fetchFunction = async () =>{
      try{
        const res = await fetch(empInfoURL);
        const json = await res.json();
        setTotalWorkInfo(json);
      }catch(err){
        console.log(err);
      }
    };

    fetchFunction();
    setInterval(() => {
      fetchFunction();
    }, 10000);

  },[])

  // console.log(totalWorkInfo);

  const reset = (date) => {
    updateCurr_day(date);
    // console.log(cur_day);
    let currentDayFormated = moment(date).format('YYYY-MM-DD');
    let workPerDay = {};
    for (let i = 0; i < totalWorkInfo.length; i++){
      let day = totalWorkInfo[i].date;
      workPerDay[day] = totalWorkInfo[i];
    }
    if (workPerDay.hasOwnProperty(currentDayFormated)){
      setWorkInfo(workPerDay[currentDayFormated]);
      if (parseInt(moment.unix(workPerDay[currentDayFormated].check_in).format('HH'), 10) < 12){
        if (parseInt(moment.unix(workPerDay[currentDayFormated].check_out).format('HH'), 10) > 13){
          console.log(moment.utc(3600*1000).format('HH:mm:ss'))
          setRest(3600);
          // setRest(moment.unix(workPerDay[currentDayFormated].check_out) - moment.unix(workPerDay[currentDayFormated].check_in));
        }
        else if (parseInt(moment.unix(workPerDay[currentDayFormated].check_out).format('HH'), 10) < 12){
          setRest(0);
        }
        else{
          let min = parseInt(moment.unix(workPerDay[currentDayFormated].check_out).minutes(), 10);
          let sec = parseInt(moment.unix(workPerDay[currentDayFormated].check_out).seconds(), 10);
          let totalSec = min*60 + sec;
          setRest(3600 - totalSec);
        }
      }
      else if (parseInt(moment.unix(workPerDay[currentDayFormated].check_in).format('HH'), 10) > 13){
        setRest(0);
      }
      else{
        if (parseInt(moment.unix(workPerDay[currentDayFormated].check_out).format('HH'), 10) > 13){
          let min = parseInt(moment.unix(workPerDay[currentDayFormated].check_in).minutes(), 10);
          let sec = parseInt(moment.unix(workPerDay[currentDayFormated].check_in).seconds(), 10);
          let totalSec = min*60 + sec;
          // setRest(totalSec);
          setRest(3600 - totalSec);
          // setRest(moment.unix(workPerDay[currentDayFormated].check_out) - moment.unix(workPerDay[currentDayFormated].check_in));
        }
        else{
          let min_out = parseInt(moment.unix(workPerDay[currentDayFormated].check_out).minutes(), 10);
          let sec_out = parseInt(moment.unix(workPerDay[currentDayFormated].check_out).seconds(), 10);
          let totalSec_out = min_out*60 + sec_out;

          let min_in = parseInt(moment.unix(workPerDay[currentDayFormated].check_in).minutes(), 10);
          let sec_in = parseInt(moment.unix(workPerDay[currentDayFormated].check_in).seconds(), 10);
          let totalSec_in = min_out*60 + sec_in;
          setRest(3600 - totalSec_in - totalSec_out);
        }
      }

      // find work time
      let ci = parseInt(moment.unix(workPerDay[currentDayFormated].check_in).hours(), 10)*3600 + parseInt(moment.unix(workPerDay[currentDayFormated].check_in).minutes(), 10)*60 + parseInt(moment.unix(workPerDay[currentDayFormated].check_in).seconds(), 10)
      let co = parseInt(moment.unix(workPerDay[currentDayFormated].check_out).hours(), 10)*3600 + parseInt(moment.unix(workPerDay[currentDayFormated].check_out).minutes(), 10)*60 + parseInt(moment.unix(workPerDay[currentDayFormated].check_out).seconds(), 10)
      let ex = 0;
      let work_temp = co - ci - restTime
      setWork(work_temp)
      
      // set normal
      if (parseInt(moment.utc(work_temp*1000).hours()) >= 8){
        ex = (parseInt(moment.utc(work_temp*1000).hours(), 10) - 8)*3600 + parseInt(moment.utc(work_temp*1000).minutes(), 10)*60 + parseInt(moment.utc(work_temp*1000).seconds(), 10)
        setExtra(ex);
      }
      else{
        setExtra(0);
      }
      setNormal(work_temp - ex);
      setIsNone(false);
    }
    else{
      setNormal(0);
      setExtra(0);
      setWorkInfo({})
      setIsNone(true);
    }
    // console.log(workPerDay[currentDayFormated]);
    // console.log(workInfo)
  }

  return (
      <View style={{backgroundColor: '#fff'}}>

        <View style={styles.containerTemp}>
          <View style={{alignItems: 'center', marginVertical: 5, borderWidth: 1}}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Xin chào {name}</Text>
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
                  reset(date);
                }}
                customDatesStyles={customDatesStyles}
            />
          </View>


          {/* This is the first block of information */}
          <View style={{height: '100%'}}>

            {/* <View style={styles.totalHours}>
              <View style={{borderWidth: 0, justifyContent: 'center', width: '75%'}}>
                <Text style={{fontSize: 16, borderWidth: 0, paddingLeft: 20, fontWeight: '600'}}>
                  Tổng thời gian tuần này
                </Text>
              </View>
              <View style={{borderWidth: 0, justifyContent: 'center', width: '25%', alignItems: 'center'}}> 
                <Text style={{borderWidth: 0, color: '#8189B0', fontWeight: 'bold'}}>{totalHours}</Text>
              </View>
            </View> */}

            <View style={styles.workingWatch}>
              {/* Title */}
              <View style={{borderWidth: 0, height: 40, justifyContent: 'center', paddingLeft: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Theo dõi thời gian</Text>
              </View>

              {/* Working supervisor */}
              <View style={{}}>
                <View style={{height: 80, borderWidth: 0, flexDirection: 'row'}}>
                    <View style={{width: '50%', height: 80, borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 16, marginVertical: 2}}>First in</Text>
                      {
                        isNone ? (<Text style={{fontSize: 16, marginVertical: 2, color: '#8189B0', fontWeight: 'bold'}}>Don't have value</Text>) : (<Text style={{fontSize: 16, marginVertical: 2, color: '#8189B0', fontWeight: 'bold'}}>{moment.unix(workInfo.check_in).format('h:mm:ss a')}</Text>)
                      }
                      
                    </View>
                    <View style={{width: '50%', height: 80, borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 16, marginVertical: 2}}>Last out</Text>
                      {
                        isNone ? (<Text style={{fontSize: 16, marginVertical: 2, color: '#8189B0', fontWeight: 'bold'}}>Don't have value</Text>) : (<Text style={{fontSize: 16, marginVertical: 2, color: '#8189B0', fontWeight: 'bold'}}>{moment.unix(workInfo.check_out).format('h:mm:ss a')}</Text>)
                      }
                    </View>
                </View>
                <View style={{height: 80, borderWidth: 0, flexDirection: 'row'}}>
                    <View style={{width: '50%', height: 80, borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 16, marginVertical: 2}}>Thời gian nghỉ</Text>
                      {
                        isNone ? (<Text style={{fontSize: 16, marginVertical: 2, color: '#8189B0', fontWeight: 'bold'}}>Don't have value</Text>) : (<Text style={{fontSize: 16, marginVertical: 2, color: '#8189B0', fontWeight: 'bold'}}>{moment.utc(restTime*1000).format('HH:mm:ss')}</Text>)
                      }
                    </View>
                    <View style={{width: '50%', height: 80, borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 16, marginVertical: 2}}>Thời gian làm việc</Text>
                      {
                        isNone ? (<Text style={{fontSize: 16, marginVertical: 2, color: '#8189B0', fontWeight: 'bold'}}>Don't have value</Text>) : (<Text style={{fontSize: 16, marginVertical: 2, color: '#8189B0', fontWeight: 'bold'}}>{moment.utc(workTime*1000).format('HH:mm:ss')}</Text>)
                      }
                    </View>
                </View>
              </View>

            </View>

            {/* Total Salary Hours */}
            <View style={styles.totalSalaryHours}>
              {/* Title */}
              <View style={{borderWidth: 0, height: 40, justifyContent: 'center', paddingLeft: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Tổng thời gian trả lương</Text>
              </View>

              <View style={{flexDirection: 'row', height: 110, borderWidth: 0}}>
                  <View style={{width: '50%', borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, marginVertical: 3}}>Giờ làm bình thường</Text>
                    <Text style={{fontSize: 16, marginVertical: 3, color: '#8189B0', fontWeight: 'bold'}}>{moment.utc(norWorHours*1000).format('HH:mm:ss')}</Text>
                  </View>
                  <View style={{width: '50%', borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, marginVertical: 3}}>Giờ làm tăng ca</Text>
                    <Text style={{fontSize: 16, marginVertical: 3, color: '#8189B0', fontWeight: 'bold'}}>{moment.utc(extrWorkHours*1000).format('HH:mm:ss')}</Text>
                  </View>
              </View>
            </View>
          </View>
        </View>
      </View>

  )
  
}

const styles = StyleSheet.create({
  container: { flex: 1, height: 100 },
  containerTemp: {width: '100%', height: '100%', padding: 0, margin: 0, borderColor: '#000', borderWidth: 0},
  totalHours: {height: 50, borderWidth: 0, borderRadius: 10, marginHorizontal: 10, backgroundColor: '#f2f8ff', flexDirection: 'row',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                
                elevation: 6,},
  workingWatch: {height: 200, borderWidth: 0, marginHorizontal: 10, backgroundColor: '#f2f8ff', marginVertical: 15, borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                
                elevation: 6,},
  totalSalaryHours: {height: 150, borderWidth: 0, marginHorizontal: 10, backgroundColor: '#f2f8ff', marginVertical: 15, borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                
                elevation: 6,}

});
