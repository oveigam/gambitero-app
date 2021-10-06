import { useEffect } from "react";


const useNavigationEvents = (events, navigation) => {
    useEffect(() => {
        const eventUnsubcribeHandlers = []

        for (const eventName of Object.keys(events)) {
            const unsubscribeHandler = navigation.addListener(eventName, events[eventName])
            eventUnsubcribeHandlers.push(unsubscribeHandler)
        }

        return () => {
            for (const unsubscribeHandler of eventUnsubcribeHandlers) {
                unsubscribeHandler()
            }
        }
    }, [navigation])
}

export default useNavigationEvents;