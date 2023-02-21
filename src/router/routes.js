import DefaultLayout from '@/layouts/Default'
import FavoritesPage from '@/views/playlists/favorites'
import LoginPage from '@/views/login'
import MainPage from '@/views/mainpage'
import MoviePage from '@/views/movie'
import page404 from '@/views/404'
import ProfilePage from '@/views/profile/'
import RegistrationPage from '@/views/registration'
import RestorePage from '@/views/restore'
import TorrentsPage from '@/views/new_torrents/'
import UserSettings from '@/views/profile/userSettings'
import WatchLaterPage from '@/views/playlists/watchlater'

const reqAuth = {
  reqAuth: true
}

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: MainPage},
      { path: 'movie/:movieID', component: MoviePage},
      { path: 'genre/:genreID', component: MainPage},
      { path: 'login', component: LoginPage},
      { path: 'registration', component: RegistrationPage},
      { path: 'restore', component: RestorePage},
      { path: 'favorites', component: FavoritesPage, meta: { ...reqAuth } },
      { path: 'watch-later', component: WatchLaterPage, meta: { ...reqAuth } },
      { path: 'new_torrents', component: TorrentsPage, meta: { ...reqAuth } },
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
