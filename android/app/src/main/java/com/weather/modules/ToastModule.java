package com.weather.modules;


import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

/*  Arguments Types:
        Boolean -> Bool
        Integer -> Number
        Double -> Number
        Float -> Number
        String -> String
        Callback -> function
        ReadableMap -> Object
        ReadableArray -> Array
 */

/**
 * native java module
 * Must be registered in
 */
public class ToastModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    //return string name of this native module, which represents class in javascript
    @Override
    public String getName() {
        return "MyToastAndroid";
    }

    // constant values exposed to JavaScript
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        // export Toast durations as constants
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    // method exposed to JavaScript (@ReactMethod annotation)
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

}
