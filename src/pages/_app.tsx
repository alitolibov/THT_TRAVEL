import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './layout/Layout'
import { Montserrat } from 'next/font/google';
 
const montserrat = Montserrat({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${montserrat.className}`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
