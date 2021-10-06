import { useEffect, useState } from "react";
import { Keyboard } from 'react-native';

const useKeyboardVisibility = () => {

    const [keyboardVisible, setKeyboardVisible] = useState(false)
    useEffect(() => {
        const showListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const hideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            hideListener.remove();
            showListener.remove();
        };
    }, []);

    return keyboardVisible;
}

export default useKeyboardVisibility;