import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './layout/Layout'
import { Montserrat } from 'next/font/google';
import Head from 'next/head';
import React from "react";
import {appWithTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
 
const montserrat = Montserrat({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${montserrat.className}`}>
      <Layout>
        <Head>
            <meta http-equiv="content-language" content="ru"/>
            <meta name="description" content="Туристическое агентство THT VISA. Туры из Cамарканда в Таиланд, Малайзию, Турцию, ОАЭ, Чехию, Израиль, Италию, Испанию, Францию, Португалию, США. Туры по всему миру. Мы бережно относимся к Вашему отдыху!"/> 
            <meta name="keywords" content="турагентство самарканд, турагентства в самарканде, туры из самарканда, горящий тур, турфирмы самарканда, туристическая фирма, туристическое агентство, туристическая компания, туроператоры в самарканде, тур туроператор, тур фирма, туропраторы по самаркунду, туризм, путешествия, туры, отдых, экскурсии, отели, авиабилеты, визы, шенген"/> 
            <meta name="author" content="THT VISA"/> 
            <meta name="robots" content="index, follow"/> 
            <meta property="og:title" content="THT VISA"/> 
            <meta property="og:description" content="Организация туров и путешествий по всему миру."/> 
            <meta property="og:type" content="website"/> 
            <meta property="og:site_name" content="THT VISA"/>
            <link rel="icon" sizes="32x32" href="/images/logo_head.png" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}


export default appWithTranslation(App)