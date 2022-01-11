import DefaultLayout from '@/layouts/Default'
import MainPage from '@/views/mainpage'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [{ path: '', component: MainPage }],
  },
]

export default routes
