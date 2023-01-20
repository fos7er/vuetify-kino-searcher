import DefaultLayout from '@/layouts/Default'
import MainPage from '@/views/mainpage'
import MoviePage from '@/views/movie'
import page404 from '@/views/404'
import LoginPage from '@/views/login'
import RegistrationPage from '@/views/registration'
import Profile from '@/views/profile/'
import UserSettings from '@/views/profile/userSettings'

const reqAuth = {
  reqAuth: true
}

const noAuth = {
  reqAuth: false
}

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: MainPage, meta: { ...noAuth } },
      { path: 'movie/:movieID', component: MoviePage, meta: { ...noAuth } },
      { path: 'genre/:genreID', component: MainPage, meta: { ...noAuth } },
      { path: 'login', component: LoginPage, meta: { ...noAuth } },
      { path: 'registration', component: RegistrationPage, meta: { ...noAuth } },
      {
        path: 'profile',
        component: Profile,
        children: [{ path: 'settings', component: UserSettings, meta: { ...reqAuth } }]
      }
    ]
  },
  {
    path: '*',
    component: page404
  }
]

export default routes
