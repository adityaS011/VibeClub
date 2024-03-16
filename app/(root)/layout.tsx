import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="bg-primary-50 dark:bg-[#000114] flex h-screen flex-col transition-all">
      <Header />
      <main className="flex-1 bg-primary-50 bg-dotted-pattern dark:bg-[#000114] bg-contain ">{children}</main>
      <Footer />
   </div>
  );
}
