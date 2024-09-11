import type { Metadata } from "next";
import "../App.css";
import "../fonts.css";
import { ToastContextProvider } from "../context/Toast/ToastContext";
import MUIThemeProvider from "../MUIThemeProvider";
import QueryProvider from "./QueryProvider";

export const metadata: Metadata = {
  title: "David'Space",
  description: "David's Personal Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-color-mode="light">
      <body>
        <div id="root">
          <QueryProvider>
            <MUIThemeProvider>
              <ToastContextProvider>{children}</ToastContextProvider>
            </MUIThemeProvider>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
{
  /* <head>
<meta charset="UTF-8" >
<link rel="icon" type="image/svg+xml" href="/icons/davidspace-icon.svg" >
<meta name="viewport" content="width=device-width, initial-scale=1.0" >
<title>David'Space</title>
</head>
<body>
<main id="root"></main>
<script type="module" src="/src/main.tsx"></script>
</body> */
}
