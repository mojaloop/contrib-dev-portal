import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

export default ({ 
  Vue,
  router 
}) => {

  Vue.use(Buefy);
  
  if (typeof window === 'undefined') {
    return;
  }

  // define redirects here
  router.addRoutes([
    { path: '/home/', redirect: '/' },
  ])
}