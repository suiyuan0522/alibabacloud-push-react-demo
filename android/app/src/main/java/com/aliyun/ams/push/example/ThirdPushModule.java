package com.aliyun.ams.push.example;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
public class ThirdPushModule extends ReactContextBaseJavaModule {
    public static ReactContext sReactContext;
    public ThirdPushModule(ReactApplicationContext reactContext) {
        super(reactContext);
        sReactContext = reactContext;
    }
    @NonNull
    @Override
    public String getName() {
        return "ThirdPushModule";
    }
    @ReactMethod
    public void onSysNoticeOpened(Callback callback) {
        InstanceHolder.getInstance().setPushCallback(callback);
    }
}
