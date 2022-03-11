import { Approuting } from "./routing/App.routing"
import { store } from "../store"
import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"
import { LostInternetConnection } from "./pagenotfound/Pagenotfound.component"

export const App = (args) => {
    var isOnline = navigator.onLine
    return (
        <>
            <Provider store={store}>
                <Toaster position="bottom-right" />
                {
                    isOnline?<Approuting></Approuting>:<LostInternetConnection></LostInternetConnection>
                }

            </Provider>
        </>
    )
}
