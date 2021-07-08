import Buefy from 'buefy'
import './styles/buefy.scss'
const { version } = require('../../package')

export default ({ 
  Vue,
  router 
}) => {

  // Add Buefy Components
  Vue.use(Buefy);

  // Add a mixin that let's us refer to the package version
  Vue.mixin({
    computed: {
      $version: () => (version)
    }
  })

  if (typeof window === 'undefined') {
    return;
  }

  // define redirects here
  router.addRoutes([
    { path: '/home/', redirect: '/' },
  ])
}