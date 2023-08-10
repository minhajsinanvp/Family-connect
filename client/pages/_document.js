import { Html, Head, Main, NextScript } from 'next/document'
import { UserProvider } from '../context'



export default function Document() {
  return (
    <UserProvider>
      <Html>
        <Head>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossOrigin="anonymous"></script>
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