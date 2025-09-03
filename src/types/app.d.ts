import { NextPage } from 'next';

declare module 'next' {
  export type PageProps<P = {}, IP = P> = {
    params?: any;
    searchParams?: any;
  };
  export type LayoutProps<P = {}, IP = P> = {
    children: React.ReactNode;
    params?: any;
  };
}

declare module 'next/app' {
  export type AppProps<P = {}> = {
    Component: NextPage<P>;
    pageProps: P & {
      __N_SSG?: boolean;
      __N_SSP?: boolean;
    };
  };
}
