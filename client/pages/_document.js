import { Html, Head, Main, NextScript } from 'next/document'
import { UserProvider } from '../context'


 
export default function Document() {
  return (
    <UserProvider>
      <Html>
      <Head>
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    </UserProvider>
  )
}