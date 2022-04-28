import classNames from 'classnames';
import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from '../../navigation/footer/Footer';
import Header from '../../navigation/header/Header';

export interface IPrimaryLayout {
  children: ReactNode;
  justify?: 'items-center' | 'items-start';
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({
  children,
  justify = 'items-center',
}) => {
  return (
    <>
      <Head>
        <title>NextJs Fullstack App</title>
      </Head>
      <div className={classNames('min-h-screen flex flex-col', justify)}>
        <Header />
        <main className="px-5">{children}</main>
        <div className="m-auto" />
        <Footer />
      </div>
    </>
  );
};

export default PrimaryLayout;
