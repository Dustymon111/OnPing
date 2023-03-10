// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document({title}) {
  return (
    <Html>
        <Head>
            <link href="https://fonts.googleapis.com/css2?family=Girassol&display=swap" rel="stylesheet" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}