'use client';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/layout/Layout';
import Head from 'next/head';
import React, {useEffect, useState} from 'react';
import {appWithTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import Loader from '@/components/Loader';
import { Providers } from '@/store/provider';

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const body = document.body as HTMLElement;
        const handleStart = () => {
            body.style.overflowY = 'hidden';
            setIsTransitioning(true);
        };
        const handleComplete = () => {
            body.style.overflowY = 'scroll';
            setIsTransitioning(false);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, []);
return (
    <div>
        {isTransitioning && <Loader />}
        <Head>
            <meta name="description" content="Откройте дверь в мир удивительных приключений с нами – лучшим турагентством, где мечты становятся реальностью. Планируйте свой незабываемый отдых вместе с нами, пока мы берем на себя всю заботу об оформлении виз. Путешествуйте без границ, обогащая свою жизнь встречами с культурами и пейзажами, которые оставят даже самых искушенных путешественников в восторге."/>
            <meta name="keywords" content="турагентство самарканд, турагентства в самарканде, туры из самарканда, горящий тур, турфирмы самарканда, туристическая фирма, туристическое агентство, туристическая компания, туроператоры в самарканде, тур туроператор, тур фирма, туропраторы по самаркунду, туризм, путешествия, туры, отдых, экскурсии, отели, авиабилеты, визы, шенген"/>
            <meta name="author" content="THT VISA"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="robots" content="index, follow"/>
            <meta name="geo.region" content="UZ"/>
            <meta name="geo.placename" content="Samarkand, Uzbekistan"/>
            <meta name="geo.position" content="39.6692451;66.9262534"/>
            <meta name="ICBM" content="39.6692451, 66.9262534"/>
            <meta name="format-detection" content="telephone=no"/>
            <meta property="og:title" content="THT VISA"/>
            <meta property="og:description" content="Откройте дверь в мир невероятных путешествий с нами. Мы создаем моменты, которые оставят след в ваших сердцах – от встреч с удивительными культурами до незабываемых видов за горизонтом."/>
            <meta property="og:image" content="https://i.imgur.com/5e0nPBQ.png"/>
            <meta property="og:url" content="https://tht-visa.com/"/>
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content="THT VISA"/>
            <meta property="og:locale" content="ru_RU"/>
            <link rel="icon" sizes="32x32" href="https://i.imgur.com/5e0nPBQ.png" />
        </Head>
        <Providers>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Providers>
    </div>
  );
}



export default appWithTranslation(App);