import Home from '../components/Home'
import Anchor from '../examples/Anchor'
import NotFound from '../components/NotFound'

const routes = [
    { path: '/', title: '', component: <Home /> },
    { path: '/anchor', title: 'Anchor Example', component: <Anchor /> },
    { path: '*', title: '', component: <NotFound /> }
]

export default routes
