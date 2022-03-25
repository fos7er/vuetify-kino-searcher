import DefaultLayout from '@/layouts/Default'
import MainPage from '@/views/mainpage'
import MoviePage from '@/views/movie'
import page404 from '@/views/404'
import LoginPage from '@/views/login'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: MainPage },
      { path: '/movie/:id', component: MoviePage },
      { path: '/genre/:id', component: MainPage },
      { path: '/login', component: LoginPage },
    ],
  },
  {
    path: '*',
    component: page404,
  },
]

export default routes
