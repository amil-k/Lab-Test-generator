import "./globals.css";

export const metadata = {
  title: "Lab Test Requisition Generator",
  description: "Generate printable laboratory test requisition forms for a clinic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
