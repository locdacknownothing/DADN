import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const {width} = Dimensions.get('screen');

const CustomDrawer = props => {
  const { navigation } = props;

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        {/* <ImageBackground source={'../assets/background_dot.png'} style={{height: 140}}>
          <Image source={'../assets/logo.png'} style={styles.userImg} />
        </ImageBackground> */}
        <View style={styles.drawerListWrapper}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};



export default CustomDrawer;

const styles = StyleSheet.create({
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    position: 'absolute',
    left: width / 2 - 110,
    bottom: -110 / 2,
    borderWidth: 4,
    borderColor: 'white',
  },
  container: {
    flex: 1,
  },
  logoutButtonText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20
  },
});