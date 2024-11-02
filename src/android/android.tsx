import * as React from 'react';
import {
    StyleSheet,
    View,
    Button,
    SafeAreaView,
    TextInput,
    Alert,
    ScrollView
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import * as AliyunPush from 'aliyun-react-native-push';

const AndroidPage = () => {
    const [open, setOpen] = React.useState(false);
    const [logLevel, setLogLevel] = React.useState('DEBUG');
    const [items, setItems] = React.useState([
        { label: 'DEBUG', value: 'DEBUG' },
        { label: 'INFO', value: 'INFO' },
        { label: 'ERROR', value: 'ERROR' },
    ]);

    const [phone, onChangePhone] = React.useState('');
    const [channel, onChangeChannel] = React.useState('');

    const closePushLog = () => {
        AliyunPush.closeAndroidPushLog().then((result) => {
            let code = result.code;
            if (code === AliyunPush.kAliyunPushSuccessCode) {
                Alert.alert('closeAndroidPushLog','成功关闭Log');
            } else {
                let errorMsg = result.errorMsg?.toString();
                Alert.alert('closeAndroidPushLog',`关闭Log失败, error: ${errorMsg}`);
            }
        });
    };

    const setAndroidLogLevel = () => {
        let level;
        if (logLevel === 'ERROR') {
            level = AliyunPush.kAliyunPushLogLevelError;
        } else if (logLevel === 'INFO') {
            level = AliyunPush.kAliyunPushLogLevelInfo;
        } else {
            level = AliyunPush.kAliyunPushLogLevelDebug;
        }
        AliyunPush.setAndroidLogLevel(level).then((result) => {
            let code = result.code;
            if (code === AliyunPush.kAliyunPushSuccessCode) {
                Alert.alert('setAndroidLogLevel',`成功设置LogLvel为${logLevel} `);
            } else {
                let errorMsg = result.errorMsg?.toString();
                Alert.alert('setAndroidLogLevel',`设置LogLevel为${logLevel}失败, error: ${errorMsg}`);
            }
        });
    };

    const bindPhoneNumber = () => {
        if (phone === '') {
            Alert.alert('请输入要绑定的电话');
        } else {
            AliyunPush.bindPhoneNumber(phone).then((result) => {
                let code = result.code;
                if (code === AliyunPush.kAliyunPushSuccessCode) {
                    Alert.alert('bindPhoneNumber',`绑定${phone}成功`);
                } else {
                    let errorMsg = result.errorMsg;
                    Alert.alert('bindPhoneNumber',`绑定${phone}失败, error: ${errorMsg}`);
                }
            });
        }
    };

    const unbindPhoneNumber = () => {
        AliyunPush.unbindPhoneNumber().then((result) => {
            let code = result.code;
            if (code === AliyunPush.kAliyunPushSuccessCode) {
                Alert.alert('unbindPhoneNumber','解绑手机号码成功');
            } else {
                let errorMsg = result.errorMsg;
                Alert.alert('unbindPhoneNumber',`解绑手机号码失败, error: ${errorMsg}`);
            }
        });
    };

    const openNotificationInGroup = () => {
        AliyunPush.setNotificationInGroup(true).then((result) => {
            let code = result.code;
            if (code === AliyunPush.kAliyunPushSuccessCode) {
                Alert.alert('setNotificationInGroup','开启通知分组展示成功');
            } else {
                let errorMsg = result.errorMsg;
                Alert.alert('setNotificationInGroup',`开启通知分组展示失败, error: ${errorMsg}`);
            }
        });
    };

    const closeNotificationInGroup = () => {
        AliyunPush.setNotificationInGroup(false).then((result) => {
            let code = result.code;
            if (code === AliyunPush.kAliyunPushSuccessCode) {
                Alert.alert('setNotificationInGroup','关闭通知分组展示成功');
            } else {
                let errorMsg = result.errorMsg;
                Alert.alert('setNotificationInGroup',`关闭通知分组展示失败, error: ${errorMsg}`);
            }
        });
    };

    const clearAllNotifications = () => {
        AliyunPush.clearAndroidNotifications().then((result) => {
            let code = result.code;
            if (code === AliyunPush.kAliyunPushSuccessCode) {
                Alert.alert('clearAndroidNotifications','清除所有通知成功');
            } else {
                let errorMsg = result.errorMsg;
                Alert.alert('clearAndroidNotifications',`清除所有通知失败, error: ${errorMsg}`);
            }
        });
    };

    const createChannel = () => {
        if (channel === '') {
            Alert.alert('createChannel','请输入Channel名称');
        } else {
            AliyunPush.createAndroidChannel({
                id: channel,
                name: '测试通道A',
                importance: 3,
                desc: '测试创建通知通道',
            }).then((result) => {
                let code = result.code;
                if (code === AliyunPush.kAliyunPushSuccessCode) {
                    Alert.alert('createAndroidChannel',`创建通道${channel}c成功`);
                } else {
                    let errorMsg = result.errorMsg;
                    Alert.alert('createAndroidChannel',`创建通道${channel}失败, error: ${errorMsg}`);
                }
            });
        }
    };

    const checkNotification = () => {
        AliyunPush.isAndroidNotificationEnabled().then((result) => {
            Alert.alert('isAndroidNotificationEnabled',`通知状态: ${result}`);
        });
    };

    const checkNotificationChannel = () => {
        if (channel === '') {
            Alert.alert('checkNotificationChannel','请输入Channel名称');
        } else {
            AliyunPush.isAndroidNotificationEnabled(channel).then((result) => {
                Alert.alert('checkNotificationChannel',`${channel}通道状态: ${result}`);
            });
        }
    };

    const jumpToNotificationSettings = () => {
        AliyunPush.jumpToAndroidNotificationSettings();
    };

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
          <SafeAreaView style={styles.container}>
              {/* <ScrollView> */}
              <View style={styles.list}>
                  <Button title="关闭AliyunPush Log" onPress={closePushLog} />
              </View>
              <View style={styles.list}>
                  <DropDownPicker
                    open={open}
                    value={logLevel}
                    items={items}
                    setOpen={setOpen}
                    setValue={setLogLevel}
                    setItems={setItems}
                  />
              </View>
              <View style={styles.list}>
                  <Button
                    title={`设置LogLevel为${logLevel}`}
                    onPress={setAndroidLogLevel}
                  />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={onChangePhone}
                value={phone}
                placeholder="输入手机号码"
                keyboardType="numeric"
                placeholderTextColor="#000000"
              />
              <View style={styles.list}>
                  <Button title="绑定手机号码" onPress={bindPhoneNumber} />
              </View>
              <View style={styles.list}>
                  <Button title="解绑手机号码" onPress={unbindPhoneNumber} />
              </View>
              <View style={styles.list}>
                  <Button title="开启通知分组展示" onPress={openNotificationInGroup} />
              </View>
              <View style={styles.list}>
                  <Button title="开启通知分组展示" onPress={closeNotificationInGroup} />
              </View>
              <View style={styles.list}>
                  <Button title="清除所有通知" onPress={clearAllNotifications} />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeChannel}
                value={channel}
                placeholder="输入通道名称"
                placeholderTextColor="#000000"
              />
              <View style={styles.list}>
                  <Button title="创建NotificationChannel" onPress={createChannel} />
              </View>
              <View style={styles.list}>
                  <Button title="检查通知状态" onPress={checkNotification} />
              </View>
              <View style={styles.list}>
                  <Button title="检查通知通道状态" onPress={checkNotificationChannel} />
              </View>
              <View style={styles.list}>
                  <Button
                    title="跳转通知通道设置界面"
                    onPress={jumpToNotificationSettings}
                  />
              </View>
              {/* </ScrollView> */}
          </SafeAreaView>
      </ScrollView>

    );
};

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
    scroll: {
        paddingTop: 20,
    },
    input: {
        height: 40,
        marginBottom: 15,
        marginHorizontal: 30,
        borderWidth: 1,
        padding: 10,
    },
    contentContainer: {
        paddingVertical: 20
    }
});

export default AndroidPage;
