package com.aliyun.ams.push.example;
import android.content.Intent;
import android.os.Bundle;
import com.alibaba.sdk.android.push.AndroidPopupActivity;
import java.util.Map;
public class ThirdPopupActivity extends AndroidPopupActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent launchIntent = getPackageManager().getLaunchIntentForPackage(getPackageName());
        startActivity(launchIntent);
        finish();
    }

    @Override
    protected void onSysNoticeOpened(String title, String content, Map<String, String> extraMap) {
        InstanceHolder.getInstance().handlePushClick(title, content, extraMap);
    }

    @Override
    public void onNotPushData(Intent intent) {
        super.onNotPushData(intent);
        finish();
    }

    @Override
    public void onParseFailed(Intent intent) {
        super.onParseFailed(intent);
        finish();
    }
}
