import { Approuting } from "./routing/App.routing"
import { store } from "../store"
import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"
export const App = (args) => {

    return (
        <>
            <Provider store={store}>
            <Toaster/>
                <Approuting></Approuting>
            </Provider>
        </>
    )
}
