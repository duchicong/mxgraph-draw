import Home from '../components/Home'
import Anchor from '../examples/Anchor'
import ZoomAndHover from '../examples/ZoomAndHover'
import NotFound from '../components/NotFound'

const routes = [
    { path: '/', title: '', component: <Home /> },
    { path: '/anchor', title: 'Anchor Example', component: <Anchor /> },
    { path: '/zoom-and-hover', title: 'Zoom and hover example', component: <ZoomAndHover /> },
    { path: '*', title: '', component: <NotFound /> }
]

export default routes
