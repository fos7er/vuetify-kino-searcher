import DefaultLayout from '@/layouts/Default'
import MainPage from '@/views/mainpage'
import MoviePage from '@/views/movie'
import page404 from '@/views/404'
import LoginPage from '@/views/login'
import RegistrationPage from '@/views/registration'
import Profile from '@/views/profile/'
import UserSettings from '@/views/profile/userSettings'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: MainPage },
      { path: 'movie/:id', component: MoviePage },
      { path: 'genre/:id', component: MainPage },
      { path: 'login', component: LoginPage },
      { path: 'registration', component: RegistrationPage },
      { path: 'profile', component: Profile, children: [{ path: 'settings', component: UserSettings }] },
    ],
  },
  {
    path: '*',
    component: page404,
  },
]

export default routes
