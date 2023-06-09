import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheets, createTheme } from "@material-ui/core/styles";

const theme = createTheme({});

//server side rendering for material-ui https://material-ui.com/guides/server-rendering/
export default class MyDocument extends Document {
    render() {
        return (
            <html lang="en">
                <Head>
                    <meta
                        name="theme-color"
                        content={theme.palette.primary.main}
                    />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="icon" href="/images/pwa-192.png" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles),
            sheets.getStyleElement(),
        ],
    };
};
