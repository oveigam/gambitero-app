import { Input, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import React, { useRef, useEffect, useState } from 'react';
import { Animated, View } from 'react-native';

const START_OPACITY = 0
const END_OPACITY = 1
const fadeInAnimation = {
    toValue: END_OPACITY,
    duration: 100,
    useNativeDriver: true
}
const fadeOutAnimation = {
    toValue: START_OPACITY,
    duration: 50,
    useNativeDriver: true
}
const fadeInBackgroundAnimation = {
    toValue: END_OPACITY,
    duration: 5,
    useNativeDriver: true
}
const fadeOutBackgroundAnimation = {
    toValue: START_OPACITY,
    duration: 5,
    useNativeDriver: true
}

const START_TRANSLATE_Y = 15
const END_TRANSLATE_Y = 0
const slideInAnimation = {
    toValue: END_TRANSLATE_Y,
    duration: 50,
    useNativeDriver: true
}
const slideOutAnimation = {
    toValue: START_TRANSLATE_Y,
    duration: 75,
    useNativeDriver: true
}

const START_TRANSLATE_X = 10
const END_TRANSLATE_X = 0
const slideInXAnimation = {
    toValue: END_TRANSLATE_X,
    duration: 50,
    useNativeDriver: true
}
const slideOutXAnimation = {
    toValue: START_TRANSLATE_X,
    duration: 75,
    useNativeDriver: true
}


const DecoratedInput = (props) => {
    const { style, status, value, placeholder, inputStyle, Component } = props

    const styles = useStyleSheet(themedStyles)

    const prevValueRef = useRef()

    const fadeAnim = useRef(new Animated.Value(START_OPACITY)).current
    const translateYAnim = useRef(new Animated.Value(START_TRANSLATE_Y)).current
    const translateXAnim = useRef(new Animated.Value(START_TRANSLATE_X)).current
    const fadeAnimBackground = useRef(new Animated.Value(START_OPACITY)).current

    useEffect(() => {
        const prevValue = prevValueRef.current
        if (value && !prevValue) {
            Animated.timing(fadeAnim, fadeInAnimation).start();
            Animated.timing(fadeAnimBackground, fadeInBackgroundAnimation).start();
            Animated.timing(translateYAnim, slideInAnimation).start();
            Animated.timing(translateXAnim, slideInXAnimation).start();
        } else if (!value && prevValue) {
            Animated.timing(fadeAnim, fadeOutAnimation).start();
            Animated.timing(fadeAnimBackground, fadeOutBackgroundAnimation).start();
            Animated.timing(translateYAnim, slideOutAnimation).start();
            Animated.timing(translateXAnim, slideOutXAnimation).start();
        }
        prevValueRef.current = value
    }, [value])

    const [focused, setFocused] = useState(false)

    const InputComponent = Component ? Component : Input

    return (
        <View style={style}>
            <View style={{ marginTop: 10 }}>
                <InputComponent
                    {...props}
                    style={inputStyle}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                <Animated.View style={[
                    styles.titleChip,
                    { transform: [{ translateY: translateYAnim }, { translateX: translateXAnim }], opacity: fadeAnim }
                ]}>
                    <Animated.View style={[
                        styles.backgroundChip,
                        focused ? styles.backgroundChipColorFocus : styles.backgroundChipColorBlur,
                        { opacity: fadeAnimBackground }
                    ]} />
                    <Text
                        style={{ paddingHorizontal: 2 }}
                        category="p2"
                        status={status ? status : 'primary'}
                    >
                        {placeholder}
                    </Text>
                </Animated.View>
            </View>
        </View>
    );
}

const themedStyles = StyleService.create({
    titleChip: {
        position: 'absolute',
        top: -11,
        marginLeft: 5,
    },
    backgroundChip: {
        position: 'absolute',
        top: 11,
        height: '50%',
        width: '100%'
    },
    backgroundChipColorFocus: {
        backgroundColor: 'background-basic-color-1',
    },
    backgroundChipColorBlur: {
        backgroundColor: 'background-basic-color-2',
    },
})

export default DecoratedInput;