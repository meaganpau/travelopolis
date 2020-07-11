import React, { Component, createContext } from "react"
import axios from "axios"
import { setToken, getToken, removeToken } from "./services/tokenServices"

export const AppContext = createContext({
    user: null,
    isAuthenticated: false,
    finishedLoading: false,
    login: () => {},
    logout: () => {},
})

export default class AppProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            login: this.login,
            logout: this.logout,
            isAuthenticated: false,
            finishedLoading: false,
        }
    }

    async componentDidMount() {
        await this.getCurrentUser()
    }

    login = async (email, password) => {
        try {
            const res = await axios.post("/api/login", { email, password })
            setToken("userToken", res.data.token)
            return await this.getCurrentUser()
        } catch (e) {
            console.log(e.response)
            return e.response.data.err
        }
    }

    getCurrentUser = async () => {
        const token = getToken("userToken")
        if (token) {
            try {
                const res = await axios.get("/api/users/current", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                this.setState({
                    user: res.data.user,
                    isAuthenticated: true,
                    finishedLoading: true,
                })
            } catch (e) {
                removeToken("userToken")
                const { status, data } = e.response
                if (status !== 200) {
                    this.setState({
                        finishedLoading: true,
                    })
                }
                return data.err
            }
        } else {
            this.setState({
                finishedLoading: true,
            })
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        const token = getToken("userToken")
        if (this.state.isAuthenticated !== prevState.isAuthenticated) {
            if (token) {
                this.getCurrentUser()
            }
        }
    }

    logout = () => {
        this.setState({ user: null })
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.state.finishedLoading && this.props.children}
            </AppContext.Provider>
        )
    }
}
