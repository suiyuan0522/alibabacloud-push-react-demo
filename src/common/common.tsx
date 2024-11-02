/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
    SafeAreaView,
    Alert,
    ScrollView,
} from 'react-native';

import * as AliyunPush from 'aliyun-react-native-push';

const CommonPage = () => {
    const [account, setAccount] = React.useState('');
    const [boundAccount, setBoundAccount] = React.useState('');
    const [aliasAdded, setAliasAdded] = React.useState('');
    const [aliasRemoved, setAliasRemoved] = React.useState('');
    const [deviceTag, setDeviceTag] = React.useState('');
    const [deviceTagRemoved, setDeviceTagRemoved] = React.useState('');
    const [accountTag, setAccountTag] = React.useState('');
    const [accountTagRemoved, setAccountTagRemoved] = React.useState('');

    const bindAccount = () => {
        if (account === '') {
            Alert.alert('bindAccount','请输入要绑定的账号');
        } else {
            AliyunPush.bindAccount(account).then((result) => {
                let code = result.code;
                if (code === AliyunPush.kAliyunPushSuccessCode) {
                    Alert.alert('bindAccount',`绑定账户:${account}成功`);
                    setAccount('');
                    setBoundAccount(account);
                } else {
                    let errorMsg = result.errorMsg?.toString();
                    Alert.alert('bindAccount',`绑定账户:${account}失败, error: ${errorMsg}`);
                }
            });
        }
    };

    const unbindAccount = () => {
        AliyunPush.unbindAccount().then((result) => {
            let code = result.code;
            if (code === AliyunPush.kAliyunPushSuccessCode) {
                Alert.alert('unbindAccount',`解绑账户成功`);
                setAccount('');
            } else {
                let errorMsg = result.errorMsg?.toString();
                Alert.alert('unbindAccount',`解绑账户失败, error: ${errorMsg}`);
            }
        });
    };

    const addAlias = () => {
        if (aliasAdded === '') {
            Alert.alert('addAlias','请输入要添加的别名');
        } else {
            AliyunPush.addAlias(aliasAdded).then((result) => {
                let code = result.code;
                if (code === AliyunPush.kAliyunPushSuccessCode) {
                    Alert.alert('addAlias',`添加别名成功`);
                    setAliasAdded('');
                } else {
                    let errorMsg = result.errorMsg?.toString();
                    Alert.alert('addAlias',`添加别名失败, error: ${errorMsg}`);
                }
            });
        }
    };

    const removeAlias = () => {
        if (aliasRemoved === '') {
            Alert.alert('removeAlias','请输入要删除的别名');
        } else {
            AliyunPush.removeAlias(aliasRemoved).then((result) => {
                let code = result.code;
                if (code === AliyunPush.kAliyunPushSuccessCode) {
                    Alert.alert('removeAlias',`删除别名成功`);
                    setAliasRemoved('');
                } else {
                    let errorMsg = result.errorMsg?.toString();
                    Alert.alert('removeAlias',`删除别名失败, error: ${errorMsg}`);
                }
            });
        }
    };

    const listAlias = () => {
        AliyunPush.listAlias().then((result) => {
            let code = result.code;
            if (code === AliyunPush.kAliyunPushSuccessCode) {
                let aliasList = result.aliasList;
                if (aliasList !== null && aliasList !== undefined) {
                    Alert.alert('listAlias',`查询别名列表结果为: ${aliasList}`);
                }
            } else {
                let errorMsg = result.errorMsg?.toString();
                Alert.alert('listAlias',`查询别名列表失败, error: ${errorMsg}`);
            }
        });
    };

    const addDeviceTag = () => {
        if (deviceTag === '') {
            Alert.alert('addDeviceTag','请输入要添加的设备标签');
        } else {
            let tags = [];
            tags.push(deviceTag);
            AliyunPush.bindTag(tags, AliyunPush.kAliyunTargetDevice).then(
                (result) => {
                    let code = result.code;
                    if (code === AliyunPush.kAliyunPushSuccessCode) {
                        Alert.alert('bindTag',`添加设备标签 ${deviceTag} 成功`);
                        setDeviceTag('');
                    } else {
                        let errorMsg = result.errorMsg?.toString();
                        Alert.alert('bindTag',`添加设备标签 ${deviceTag} 失败, error: ${errorMsg}`);
                    }
                }
            );
        }
    };

    const removeDeviceTag = () => {
        if (deviceTagRemoved === '') {
            Alert.alert('removeDeviceTag','请输入要删除的设备标签');
        } else {
            let tags = [];
            tags.push(deviceTagRemoved);
            AliyunPush.unbindTag(tags, AliyunPush.kAliyunTargetDevice).then(
                (result) => {
                    let code = result.code;
                    if (code === AliyunPush.kAliyunPushSuccessCode) {
                        Alert.alert('removeDeviceTag',`删除设备标签 ${deviceTagRemoved} 成功`);
                        setDeviceTagRemoved('');
                    } else {
                        let errorMsg = result.errorMsg;
                        Alert.alert(
                          'removeDeviceTag',`删除设备标签 ${deviceTagRemoved} 失败, error: ${errorMsg}`
                        );
                    }
                }
            );
        }
    };

    const listDeviceTag = () => {
        AliyunPush.listTags(AliyunPush.kAliyunTargetDevice).then((result) => {
            let code = result.code;
            if (code === AliyunPush.kAliyunPushSuccessCode) {
                let tagList = result.tagsList;
                if (tagList !== null && tagList !== undefined) {
                    Alert.alert('listTags',`查询设备标签列表结果为: ${tagList}`);
                }
                console.log('result is: ', result);
            } else {
                let errorMsg = result.errorMsg;
                Alert.alert('listTags',`查询设备标签列表失败, error: ${errorMsg}`);
            }
        });
    };

    const addAcountTag = () => {
        if (accountTag === '') {
            Alert.alert('addAcountTag','请输入要添加的账号标签');
        } else {
            let tags = [];
            tags.push(accountTag);
            AliyunPush.bindTag(tags, AliyunPush.kAliyunTargetAccount).then(
                (result) => {
                    let code = result.code;
                    if (code === AliyunPush.kAliyunPushSuccessCode) {
                        Alert.alert('addAcountTag',`添加账号标签 ${accountTag} 成功`);
                        setAccountTag('');
                    } else {
                        let errorMsg = result.errorMsg;
                        Alert.alert('addAcountTag',`添加账号标签 ${accountTag} 失败, error: ${errorMsg}`);
                    }
                }
            );
        }
    };

    const removeAccountTag = () => {
        if (accountTagRemoved === '') {
            Alert.alert('removeAccountTag','请输入要删除的账号标签');
        } else {
            let tags = [];
            tags.push(accountTagRemoved);
            AliyunPush.unbindTag(tags, AliyunPush.kAliyunTargetAccount).then(
                (result) => {
                    let code = result.code;
                    if (code === AliyunPush.kAliyunPushSuccessCode) {
                        Alert.alert('removeAccountTag',`删除账号标签 ${accountTagRemoved} 成功`);
                        setAccountTagRemoved('');
                    } else {
                        let errorMsg = result.errorMsg;
                        Alert.alert(
                          'removeAccountTag',`删除设备标签 ${accountTagRemoved} 失败, error: ${errorMsg}`
                        );
                    }
                }
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TextInput
                    style={styles.input}
                    onChangeText={setAccount}
                    value={account}
                    placeholder="输入要绑定的账号"
                    placeholderTextColor="#000000"
                />
                <View style={styles.list}>
                    <Button title="绑定账号" onPress={bindAccount} />
                </View>
                <View style={styles.list}>
                    <Text>已绑定账号: {boundAccount}</Text>
                </View>
                <View style={styles.list}>
                    <Button title="解绑账号" onPress={unbindAccount} />
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={setAliasAdded}
                    value={aliasAdded}
                    placeholder="输入要添加的别名"
                    placeholderTextColor="#000000"
                />
                <View style={styles.list}>
                    <Button title="添加别名" onPress={addAlias} />
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={setAliasRemoved}
                    value={aliasRemoved}
                    placeholder="输入要删除的别名"
                    placeholderTextColor="#000000"
                />
                <View style={styles.list}>
                    <Button title="删除别名" onPress={removeAlias} />
                </View>
                <View style={styles.list}>
                    <Button title="查询别名列表" onPress={listAlias} />
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={setDeviceTag}
                    value={deviceTag}
                    placeholder="输入要添加的设备标签"
                    placeholderTextColor="#000000"
                />
                <View style={styles.list}>
                    <Button title="给设备添加标签" onPress={addDeviceTag} />
                </View>

                <TextInput
                    style={styles.input}
                    onChangeText={setDeviceTagRemoved}
                    value={deviceTagRemoved}
                    placeholder="删除设备标签"
                    placeholderTextColor="#000000"
                />
                <View style={styles.list}>
                    <Button title="删除设备标签" onPress={removeDeviceTag} />
                </View>

                <View style={styles.list}>
                    <Button title="查询设备标签列表" onPress={listDeviceTag} />
                </View>

                <TextInput
                    style={styles.input}
                    onChangeText={setAccountTag}
                    value={accountTag}
                    placeholder="输入要添加的账号标签"
                    placeholderTextColor="#000000"
                />
                <View style={styles.list}>
                    <Button title="给账号添加标签" onPress={addAcountTag} />
                </View>

                <TextInput
                    style={styles.input}
                    onChangeText={setAccountTagRemoved}
                    value={accountTagRemoved}
                    placeholder="输入要删除的账号标签"
                    placeholderTextColor="#000000"
                />
                <View style={styles.list}>
                    <Button title="删除账号标签" onPress={removeAccountTag} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    list: {
        marginBottom: 15,
        marginHorizontal: 30,
    },
    input: {
        height: 40,
        marginBottom: 15,
        marginHorizontal: 30,
        borderWidth: 1,
        padding: 10,
    },
});

export default CommonPage;
