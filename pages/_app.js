import Layout from '../comps/Layout'
import '../styles/globals.css'
import { ThemeContextProvider} from '../context/ThemeContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <ThemeContextProvider>
      <Layout>
        <Component {...pageProps} />     
      </Layout>
    </ThemeContextProvider>
    </>

  )
  
}

export default MyApp
