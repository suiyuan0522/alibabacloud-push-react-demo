import * as React from 'react';
import { DeviceEventEmitter, NativeModules, Platform, Text } from 'react-native';

import { StyleSheet, SafeAreaView, View, Button, Alert,ToastAndroid } from 'react-native';
import * as AliyunPush from 'aliyun-react-native-push';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AndroidPage from './android/android';
import IOSPage from './ios/ios';
import CommonPage from './common/common';

const HomeScreen = ({ navigation }) => {
  const [deviceId, setDeviceId] = React.useState<string>('');
  const initAliyunPush = () => {
    if (Platform.OS === 'ios') {
      AliyunPush.initPush('自己的ios appKey', '自己的ios appSecrect').then(
        (result) => {
          let code = result.code;
          if (code === AliyunPush.kAliyunPushSuccessCode) {
            Alert.alert('initPush','Init iOS AliyunPush successfully');
          } else {
            let errorMsg = result.errorMsg?.toString();
            Alert.alert('initPush',`Failed to Init iOS AliyunPush, errorMsg: ${errorMsg}`);
          }
        }
      );
    } else {
      AliyunPush.initPush()
        .then((result) => {
          let code = result.code;
          if (code === AliyunPush.kAliyunPushSuccessCode) {
            Alert.alert('initPush','Init Android AliyunPush successfully');
          } else {
            let errorMsg = result.errorMsg?.toString();
            Alert.alert(
              'initPush',`Failed to Init Android AliyunPush, errorMsg: ${errorMsg}`
            );
          }
        })
        .catch((error) => {
          console.log('error is ', error);
        });
    }
  };

  const initThirdPush = () => {
    AliyunPush.initAndroidThirdPush().then((result) => {
      console.log(result);
      let code = result.code;
      if (code === AliyunPush.kAliyunPushSuccessCode) {
        Alert.alert('initAndroidThirdPush','Init Android AliyunPush successfully');
      } else {
        let errorMsg = result.errorMsg?.toString();
        Alert.alert('initAndroidThirdPush',`Failed to Init Android AliyunPush, errorMsg: ${errorMsg}`);
      }
    });
  };

  const getDeviceId = () => {
    AliyunPush.getDeviceId().then((deviceId) => {
      if (deviceId === null) {
        Alert.alert('getDeviceId',`deviceId is null, please init AliyunPush first`);
      } else {
        setDeviceId(deviceId);
      }
    });
  };

  const commonPage = () => {
    navigation.navigate('Common');
  };

  const androidPage = () => {
    navigation.navigate('Android');
  };

  const iOSPage = () => {
    navigation.navigate('IOS');
  };

  const closeCCPChannel = () => {
    AliyunPush.closeIOSCCPChannel();
  }

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' && <View style={styles.list}>
        <Button title="关闭iOS消息通道(必须在初始化之前调用)" onPress={closeCCPChannel} />
      </View>}
      <View style={styles.list}>
        <Button title="初始化AliyunPush" onPress={initAliyunPush} />
      </View>
      <View style={styles.list}>
        <Button title="初始化厂商通道" onPress={initThirdPush} />
      </View>
      <View style={styles.list}>
        <Button title="查询deviceId" onPress={getDeviceId} />
      </View>
      <View style={styles.list}>
        <Text>{deviceId}</Text>
      </View>
      <View style={styles.list}>
        <Button title="账号/别名/标签 功能" onPress={commonPage} />
      </View>
      <View style={styles.list}>
        <Button title="Android平台特定方法" onPress={androidPage} />
      </View>
      <View style={styles.list}>
        <Button title="iOS平台特定方法" onPress={iOSPage} />
      </View>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();
export default class App extends React.Component {
  componentDidMount(): void {
    NativeModules.ThirdPushModule.onSysNoticeOpened((result) => {
      DeviceEventEmitter.addListener(
        'ThirdPush_onSysNoticeOpened',
        (event) => {
          console.log('onSysNoticeOpened: event', event);
        }
      );
      console.log('onSysNoticeOpened: ', result);
    });

    AliyunPush.addNotificationCallback((event) => {
      console.log('onNotification: ', event);
      Alert.alert('onNotification',JSON.stringify(event));
    });

    AliyunPush.addNotificationReceivedInApp((event) => {
      console.log('onNotificationReceivedInApp: ', event);
      Alert.alert('onNotificationReceivedInApp',JSON.stringify(event));
    });

    AliyunPush.addMessageCallback((event) => {
      console.log('onMessage: ', event);
      Alert.alert('onMessage',JSON.stringify(event));
    });

    AliyunPush.addNotificationOpenedCallback((event) => {
      console.log('onNotificationOpen: ', event);
      Alert.alert('onNotificationOpen',JSON.stringify(event));
    });

    AliyunPush.addNotificationRemovedCallback((event) => {
      console.log('onNotificationRemoved: ', event);
      Alert.alert('onNotificationRemoved',JSON.stringify(event));
    });

    AliyunPush.addNotificationClickedWithNoAction((event) => {
      console.log('onNotificationClickedWithNoAction: ', event);
      Alert.alert('onNotificationClickedWithNoAction',JSON.stringify(event));
    });

    AliyunPush.addChannelOpenCallback((event) => {
      console.log('onChannelOpen: ', event);
      Alert.alert('onChannelOpen',JSON.stringify(event));
    });

    AliyunPush.addRegisterDeviceTokenSuccessCallback((event) => {
      console.log('onRegisterDeviceTokenSuccess: ', event);
      Alert.alert('onRegisterDeviceTokenSuccess',JSON.stringify(event));
    });

    AliyunPush.addRegisterDeviceTokenFailedCallback((event) => {
      console.log('onRegisterDeviceTokenFailed: ', event);
      Alert.alert('onRegisterDeviceTokenFailed',JSON.stringify(event));
    });

    if (Platform.OS !== 'ios') {
      AliyunPush.createAndroidChannel({
        id: '8.0up',
        name: '测试通道A',
        importance: 3,
        desc: '测试创建通知通道',
      }).then((result) => {
        console.log(result);
      });
    }
  }

  componentWillUnmount(): void {
    AliyunPush.removePushCallback();
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Common" component={CommonPage} />
          <Stack.Screen name="Android" component={AndroidPage} />
          <Stack.Screen name="IOS" component={IOSPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  list: {
    marginBottom: 15,
    marginHorizontal: 30,
  },
});

