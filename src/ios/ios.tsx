/* eslint-disable prettier/prettier */
import * as React from 'react';
import { StyleSheet, View, TextInput, Button, SafeAreaView, Text, Alert } from 'react-native';

import * as AliyunPush from 'aliyun-react-native-push';

const IOSPage = () => {

    const [badge, setBadge] = React.useState('');
    const [apnsToken, setApnsToken] = React.useState('');

    const openDebugLog = () => {
        AliyunPush.turnOnIOSDebug().then(result => {
            let code = result.code;
            if (code === AliyunPush.kAliyunPushSuccessCode) {
                Alert.alert('turnOnIOSDebug','打开Debug日志成功');
            } else {
                let errorMsg = result.errorMsg?.toString();
                Alert.alert('turnOnIOSDebug',`打开Debug日志失败, error: ${errorMsg}`);
            }
        });
    }

    const setBadgeNum = () => {
        if (badge === null || badge === undefined) {
            Alert.alert('setBadgeNum','请输入角标数');
        } else {
            AliyunPush.setIOSBadgeNum(+badge).then(result => {
                let code = result.code;
                if (code === AliyunPush.kAliyunPushSuccessCode) {
                    setBadge('');
                    Alert.alert('setBadgeNum',`设置角标 ${badge} 成功`);
                } else {
                    let errorMsg = result.errorMsg?.toString();
                    Alert.alert('setBadgeNum',`设置角标 ${badge} 失败, error: ${errorMsg}`);
                }
            });
        }
    }

    const syncBadgeNum = () => {
        if (badge === null || badge === undefined) {
            Alert.alert('syncBadgeNum','请输入角标数');
        } else {
            AliyunPush.syncIOSBadgeNum(+badge).then(result => {
                let code = result.code;
                if (code === AliyunPush.kAliyunPushSuccessCode) {
                    setBadge('');
                    Alert.alert('syncBadgeNum',`同步角标 ${badge} 成功`);
                } else {
                    let errorMsg = result.errorMsg?.toString();
                    Alert.alert('syncBadgeNum',`同步角标 ${badge} 失败, error: ${errorMsg}`);
                }
            });
        }
    }

    const getApnsToken = () => {
        AliyunPush.getApnsDeviceToken().then(result => {
            setApnsToken(result);
        });
    }

    const checkChannelOpened = () => {
        AliyunPush.isIOSChannelOpened().then(opened => {
            if (opened) {
                Alert.alert('isIOSChannelOpened','通道已打开');
            } else {
                Alert.alert('isIOSChannelOpened','通道未打开');
            }
        });
    }

    const showNotificationForeground = () => {
        AliyunPush.showNoticeWhenForeground(true).then(result => {
            let code = result.code;
            if (code === AliyunPush.kAliyunPushSuccessCode) {
                setBadge('');
                Alert.alert('showNoticeWhenForeground','设置前台显示通知成功');
            } else {
                let errorMsg = result.errorMsg?.toString();
                Alert.alert('showNoticeWhenForeground',`设置前台显示通知失败, error: ${errorMsg}`);
            }
        });
    }

    const doNotShowNotificationForeground = () => {
        AliyunPush.showNoticeWhenForeground(false).then(result => {
            let code = result.code;
            if (code === AliyunPush.kAliyunPushSuccessCode) {
                setBadge('');
                Alert.alert('showNoticeWhenForeground','设置前台不显示通知成功');
            } else {
                let errorMsg = result.errorMsg?.toString();
                Alert.alert('showNoticeWhenForeground',`设置前台不显示通知失败, error: ${errorMsg}`);
            }
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.list}>
                <Button title={'打开Debug日志'} onPress={openDebugLog} />
            </View>
            <TextInput
                style={styles.input}
                onChangeText={setBadge}
                value={badge}
                keyboardType="numeric"
                placeholder="角标个数"
                placeholderTextColor="#000000"
            />
            <View style={styles.list}>
                <Button title='设置角标个数' onPress={setBadgeNum} />
            </View>
            <View style={styles.list}>
                <Button title='同步角标个数' onPress={syncBadgeNum} />
            </View>
            <View style={styles.list}>
                <Button title='查询ApnsToken' onPress={getApnsToken} />
            </View>
            <View style={styles.list}>
                <Text>ApnsToken: {apnsToken}</Text>
            </View>
            <View style={styles.list}>
                <Button title='通知通道是否已打开' onPress={checkChannelOpened} />
            </View>
            <View style={styles.list}>
                <Button title='前台显示通知' onPress={showNotificationForeground} />
            </View>
            <View style={styles.list}>
                <Button title='前台不显示通知' onPress={doNotShowNotificationForeground} />
            </View>

        </SafeAreaView>
    )

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
    scroll: {
        paddingTop: 20
    },
    input: {
        height: 40,
        marginBottom: 15,
        marginHorizontal: 30,
        borderWidth: 1,
        padding: 10,
    },
});


export default IOSPage;
