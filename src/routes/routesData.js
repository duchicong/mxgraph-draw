import Home from '../components/Home'
import Anchor from '../examples/Anchor'
import Animation from '../examples/Animation'
import ZoomAndHover from '../examples/ZoomAndHover'
import NotFound from '../components/NotFound'

const routes = [
    { path: '/', category: 'example', title: '', component: <Home /> },
    { path: '/anchor', category: 'example', title: 'Anchor Example', component: <Anchor /> },
    { path: '/animation', category: 'example', title: 'Animation example', component: <Animation /> },
    { path: '/zoom-and-hover', category: 'example', title: 'Zoom and hover example', component: <ZoomAndHover /> },
    { path: '*', title: '', component: <NotFound /> }
]

export default routes
