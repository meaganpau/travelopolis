import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Global, css } from "@emotion/core"
import { ThemeProvider } from "emotion-theming"
import theme from "./styles/theme"
import GlobalStyles from "./styles/global"
import LoginPage from "./pages/LoginPage"
import Explore from "./pages/Explore"
import Register from "./pages/Register"
import MainBackground from "./components/MainBackground"
import TripListing from "./routes/TripListing"
import AdminRoutes from "./routes/AdminRoutes"
import AppContext from "./AppContext"
import NotFound from "./pages/404"

const App = () => (
    <AppContext>
        <Global
            styles={css`
                ${GlobalStyles}
            `}
        />
        <ThemeProvider theme={theme}>
            <MainBackground>
                <Router>
                    <Switch>
                        <Route exact path="/" component={LoginPage} />
                        <Route exact path={"/explore"} component={Explore} />
                        <Route exact path={"/register"} component={Register} />
                        <Route exact path="/404" component={NotFound} />
                        <Route path={"/admin"} component={AdminRoutes} />
                        <Route path={"/:userSlug"} component={TripListing} />
                    </Switch>
                </Router>
            </MainBackground>
        </ThemeProvider>
    </AppContext>
)

export default App
