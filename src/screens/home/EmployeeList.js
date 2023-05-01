import React, { useState } from 'react'
import Background from '../../components/Background'
import Header from '../../components/Header'
import CalendarStrip from 'react-native-calendar-strip';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {Avatar, SearchBar, Icon} from 'react-native-elements'

export default function EmployeeList({navigation}) {
  const [cur_day, updateCurr_day] = useState(new Date());
  let customDatesStyles = [{
    startDate: cur_day,
    dateContainerStyle: { backgroundColor: 'black' },
  }];
  const [searchText, updateSearchText] = useState('');
  const [avatarLink, updateAvatarLink] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/481px-Cat03.jpg')
  const [start_work_time, updateStartWorkTime] = useState('9:00');
  const [end_work_time, updateEndWorkTime] = useState('Hiện tại')
  
  console.log(searchText);
  return (
    <View style={[styles.containerTemp]}>
      <View>
        <CalendarStrip
          scrollable
          style={{height:100, paddingBottom: 10}}
          selectedDate={cur_day}
          calendarColor={'#fff'}
          calendarHeaderStyle={{color: '#8189B0'}}
          dateNumberStyle={{color: '#8189B0'}}
          dateNameStyle={{color: '#8189B0'}}
          iconContainer={{flex: 0.1}}
          highlightDateNumberStyle={{color: 'white'}}
          highlightDateNameStyle={{color: 'white'}}
          onDateSelected={(date) => {updateCurr_day(date)}}
          customDatesStyles={customDatesStyles}
          />
        <View style={{paddingLeft: 10, paddingRight: 10}}>
          <SearchBar
            lightTheme 
            placeholder="Search for member"
            onChangeText={updateSearchText}
            value={searchText}
            containerStyle={{borderRadius: 50, height: 50, backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#dfdfdf'}}
            inputContainerStyle={{borderRadius: 50, height: 20, backgroundColor: '#fff'}}
            inputStyle={{fontSize: 15}}
          />
        </View>
      </View>
      <View>
        <View style={styles.empHolder}>
          <View style = {{flexDirection: 'row'}}>
            <View style={styles.avatarContainer}>
              <Avatar rounded size={55} source={{
                    uri: avatarLink,
                  }} containerStyle={{backgroundColor: '#F64561'}}></Avatar>
            </View>
            <View style={styles.userInforHolder}>
              <Text size={16}>
                Truong Nguyen Khoi Nguyen
              </Text>
              <Text size={12} style={{color: '#8189B0', fontWeight: 'bold'}}>
                  {start_work_time} - {end_work_time}
              </Text>
            </View>
            <View  style={{alignSelf: 'flex-end', width: '37%', height: 70, justifyContent: 'center'}}>
              <Icon size={30} name='chevron-right' type='feather' color='#878997'></Icon>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {backgroundColor: "#FDEDEB", height: 70, width: 70, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginLeft: 10},
  container: { flex: 1, height: 100},
  containerTemp: {marginTop: 50},
  empHolder: {height: 80, backgroundColor: '#f2f8ff', margin: 20, borderRadius: 20, justifyContent: 'center'},
  userInforHolder: {alignSelf: 'center', marginLeft: 10}
});

