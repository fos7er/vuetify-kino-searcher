import DefaultLayout from '@/layouts/Default'
import MainPage from '@/views/mainpage'
import MoviePage from '@/views/movie'
import page404 from '@/views/404'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: MainPage },
      { path: '/movie/:id', component: MoviePage },
    ],
  },
  {
    path: '*',
    component: page404,
  },
]

export default routes
