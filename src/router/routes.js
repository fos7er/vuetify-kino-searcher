import DefaultLayout from '@/layouts/Default'
import MainPage from '@/views/mainpage'
import MoviePage from '@/views/movie'
import page404 from '@/views/404'
import LoginPage from '@/views/login'
import RegistrationPage from '@/views/registration'
import RestorePage from '@/views/restore'
import ProfilePage from '@/views/profile/'
import UserSettings from '@/views/profile/userSettings'
import FavoritesPage from '@/views/playlists/favorites'
import WatchLaterPage from '@/views/playlists/watchlater'

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
      { path: 'restore', component: RestorePage, meta: { ...noAuth } },
      { path: 'favorites', component: FavoritesPage, meta: { ...reqAuth } },
      { path: 'watch-later', component: WatchLaterPage, meta: { ...reqAuth } },
      {
        path: 'profile',
        component: ProfilePage,
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
