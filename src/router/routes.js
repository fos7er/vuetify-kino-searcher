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
      { path: '', component: MainPage, meta: { requiresAuth: false } },
      { path: 'movie/:id', component: MoviePage, meta: { requiresAuth: false } },
      { path: 'genre/:id', component: MainPage, meta: { requiresAuth: false } },
      { path: 'login', component: LoginPage, meta: { requiresAuth: false } },
      { path: 'registration', component: RegistrationPage, meta: { requiresAuth: false } },
      {
        path: 'profile',
        component: Profile,
        meta: { requiresAuth: true },
        children: [{ path: 'settings', component: UserSettings, meta: { requiresAuth: true } }],
      },
    ],
  },
  {
    path: '*',
    component: page404,
  },
]

export default routes
