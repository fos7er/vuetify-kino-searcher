import DefaultLayout from '@/layouts/Default'
import FavoritesPage from '@/pages/playlists/favorites'
import LoginPage from '@/pages/login'
import MainPage from '@/pages/mainpage'
import MoviePage from '@/pages/movie'
import page404 from '@/pages/404'
import ProfilePage from '@/pages/profile/'
import RegistrationPage from '@/pages/registration'
import RestorePage from '@/pages/restore'
import TorrentsPage from '@/pages/new_torrents/'
import UserSettings from '@/pages/profile/userSettings'
import WatchLaterPage from '@/pages/playlists/watchlater'

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
