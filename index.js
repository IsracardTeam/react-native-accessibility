
import { NativeModules, AccessibilityInfo, findNodeHandle, Platform, UIManager } from 'react-native';

const { RNAccessibility } = NativeModules;

const FOCUS_ON_VIEW = 8;

const announceForAccessibility = Platform.OS === 'android' ? RNAccessibility.announce : AccessibilityInfo.announceForAccessibility;


module.exports = {
    announceForAccessibility,
    focusOnView(ref) {

        if(!ref) {
            console.warn("ref is null")
            return
        }

        try{
            AccessibilityInfo.isScreenReaderEnabled().then(isEnabled => {
             if(isEnabled){
                const reactTag = findNodeHandle(ref)
 
                Platform.OS === 'android' ? UIManager.sendAccessibilityEvent(
                    reactTag,
                    FOCUS_ON_VIEW
                ) : AccessibilityInfo.setAccessibilityFocus(reactTag)
             }
            });
        }catch(e){
            console.log(e)
        }
    }   
}
