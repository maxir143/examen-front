import "./globals.css";

export const metadata = {
  title: "Examen front",
  description: "examen front",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-between p-10">
        {children}
      </body>
    </html>
  );
}
