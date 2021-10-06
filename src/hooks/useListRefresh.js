import { useCallback, useState } from "react";


const useListRefresh = (fetchCall) => {

    const [refreshing, setRefreshing] = useState(false)

    const refresh = async () => {
        setRefreshing(true)
        await fetchCall()
        setRefreshing(false)
    }

    return { refreshing, refresh }
}

export default useListRefresh;