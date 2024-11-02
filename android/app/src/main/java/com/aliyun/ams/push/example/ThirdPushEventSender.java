package com.aliyun.ams.push.example;

import android.util.Log;
import com.facebook.react.modules.core.DeviceEventManagerModule;
/**
 * @author wangyun
 * @date 2023/3/3
 */
public class ThirdPushEventSender {
	public static void sendEvent(String eventName, String params) {
		try {
			if (ThirdPushModule.sReactContext != null) {
				ThirdPushModule.sReactContext.getJSModule(
					DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ThirdPush_" + eventName, params);
			}
		} catch (Exception e) {
			Log.e("ThirdPush", Log.getStackTraceString(e));
		}
	}
}
