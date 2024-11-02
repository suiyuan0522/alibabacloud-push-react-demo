package com.aliyun.ams.push.example;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.facebook.react.bridge.Callback;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 *
 */
public class InstanceHolder {

    public static final String KEY_TITLE = "title";
    public static final String KEY_CONTENT = "content";

    private static class Holder {
        private static final InstanceHolder instance = new InstanceHolder();
    }

    public static InstanceHolder getInstance() {
        return Holder.instance;
    }

    private InstanceHolder() {
    }

    private Callback pushCallback;
    private final ArrayList<Map<String, String>> dataToSend = new ArrayList<>();

    public void setPushCallback(Callback pushCallback) {
        this.pushCallback = pushCallback;
        if (!dataToSend.isEmpty()) {
            synchronized (dataToSend) {
                while (!dataToSend.isEmpty()) {
                    Map<String, String> data = dataToSend.remove(0);
                    sendByPushCallback(data);
                }
            }
        }
    }

    public void handlePushClick(String title, String content, Map<String, String> map) {
        Map<String, String> writableMap = new HashMap<>();
        writableMap.put(KEY_TITLE, title);
        writableMap.put(KEY_CONTENT, content);
        try {
            if (map != null && !map.isEmpty()) {
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonString = objectMapper.writeValueAsString(map);
                writableMap.put("extra", jsonString);
            }
            if (pushCallback != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonString = objectMapper.writeValueAsString(writableMap);
                ThirdPushEventSender.sendEvent("onSysNoticeOpened",jsonString);
            } else {
                synchronized (dataToSend) {
                    dataToSend.add(writableMap);
                }
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private void sendByPushCallback(Map<String, String> map) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonString = objectMapper.writeValueAsString(map);
            if (pushCallback != null) {
                pushCallback.invoke(jsonString);
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }
}
