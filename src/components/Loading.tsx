import React from "react"
import { ActivityIndicator } from "react-native"
import { loadingStyle } from "../styles/LoadingStyle"

const Loading = () => {
    return(
        <ActivityIndicator size="large" color="#ded9ee" style={loadingStyle.loading}></ActivityIndicator>
    )
}

export default Loading