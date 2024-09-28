"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import Currency from "@/components/ui/currency";
import { useMask } from "@react-input/mask";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Link from "next/link";
import postOrder from "@/actions/post-form";

interface FormData {
  name: string;
  phoneNumber: string;
  address: string;
}

const CartPage = ({ t, lang }: { t: any; lang: any }) => {
  // Hooks must be called unconditionally
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    address: "",
  });
  const [error, setError] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });

  const cart = useCart();

  const inputRef = useMask({
    mask: "(998) __-___-__-__",
    replacement: { _: /\d/ },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const validateInput = (value: string) => {
    // Example validation for phone number format
    const phonePattern = /^\(998\) \d{2}-\d{3}-\d{2}-\d{2}$/;
    return phonePattern.test(value);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onCheckout = async () => {
    setIsLoading(true);
    if (formData.name === "") {
      setIsLoading(false);
      setError((prevError) => ({
        ...prevError,
        name: `${t.navigation.incorrect_name}.`,
      }));
      return;
    }
    if (!validateInput(formData.phoneNumber)) {
      setIsLoading(false);
      setError((prevError) => ({
        ...prevError,
        phoneNumber: `${t.navigation.incorrect_phone}.`,
      }));
      return;
    }

    if (formData.address === "") {
      setIsLoading(false);
      setError((prevError) => ({
        ...prevError,
        address: `${t.navigation.incorrect_address}.`,
      }));
      return;
    }

    const body: any = {
      phoneNumber: formData.phoneNumber,
      name: formData.name,
      address: formData.address,
    };
    await postOrder(body);

    setError({
      name: "",
      phoneNumber: "",
      address: "",
    });
    setSuccess(true);
    setIsLoading(false);
  };

  return (
    <div className="bg-white flex justify-center h-screen">
      <Container>
        <div className="mt-2 px-4 sm:px-6 lg:px-8 mx-auto">
          {isSuccess ? (
            <>
              <div
                className="mt-4 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                role="alert"
              >
                <div className="flex">
                  <div>
                    <p className="font-bold text-xl">
                      {t.navigation.request_successsfully_done}!
                    </p>
                    <p className="text-md">{t.navigation.contact_managers}.</p>
                  </div>
                </div>
              </div>
              <Link href={`/${lang}/products`}>
                <Button className="w-full mt-6 bg-primary">
                  {t.navigation.back_to_products}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-black">
                {t.navigation.request}
              </h1>
              <h4>{t.navigation.request_contact_managers}</h4>
              <div className="mt-4 md:mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                <div className="bg-gray-50 lg:col-span-12 p-4">
                  <div className="flex flex-col gap-2">
                    <div className="mb-4 w-full">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        {t.navigation.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <p className="text-red-700">{error?.name}</p>
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        {t.navigation.phone_number}
                      </label>
                      <input
                        ref={inputRef}
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full lg-w-2/4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <p className="text-red-700">{error?.phoneNumber}</p>
                    </div>
                    <div className="mb-4 w-full">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        {t.navigation.address}
                      </label>
                      <select
                        value={formData.address}
                        name="address"
                        onChange={handleChange}
                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="Toshkent viloyat">
                          {t.navigation.toshkent}
                        </option>
                        <option value="Toshkent viloyat">
                          {t.navigation.tashkent_region}
                        </option>
                        <option value="Andijon">{t.navigation.andijon}</option>
                        <option value="Namangan">
                          {t.navigation.namangan}
                        </option>
                        <option value="Buxoro">{t.navigation.bukhoro}</option>
                        <option value="Farg'ona">{t.navigation.fargona}</option>
                        <option value="Jizzax">{t.navigation.jizzakh}</option>
                        <option value="Navoiy">{t.navigation.navoiy}</option>
                        <option value="Qashqadaryo">
                          {t.navigation.kashkadaryo}
                        </option>
                        <option value="Samarqand">
                          {t.navigation.samarkand}
                        </option>
                        <option value="Sirdaryo">
                          {t.navigation.sirdaryo}
                        </option>
                        <option value="Surxondaryo">
                          {t.navigation.surkhondaryo}
                        </option>
                        <option value="Xorazm">{t.navigation.khorazm}</option>
                        <option value="Qoraqalpog'iston">
                          {t.navigation.korakalpogiston}
                        </option>
                      </select>
                      <p className="text-red-700">{error?.address}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg lg:col-span-12 px-4">
                  <Button
                    onClick={onCheckout}
                    disabled={isLoading}
                    className="w-full bg-secondary-400 m-0 "
                  >
                    {t.navigation.send}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
