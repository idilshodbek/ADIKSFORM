import { getDictionary } from "@/lib/dictionary";
import CartPage from "./components/main";
import { Metadata } from "next";
import { Locale } from "@/i18n.config";

interface ProductPageProps {
  params: {
    lang: any;
    productId: string;
  };
}

export default async function CartPageContainer({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getDictionary(lang);
  return <CartPage t={t} lang={lang} />;
}