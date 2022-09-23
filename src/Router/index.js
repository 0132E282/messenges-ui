import Login from "~/components/Page/Login"
import toRouter from "./toRouter"
import ChatRom from "~/components/Page/ChatRom";
import DefaultLayout from "~/components/layout/DefaultLayout";
const publicRouter = [
    {
        component: Login,
        path: toRouter.Login,
    },
    {
        component: ChatRom,
        path: toRouter.ChatRom,
        layout: DefaultLayout
    },
]
const privateRouter = [

]
export { publicRouter, privateRouter }