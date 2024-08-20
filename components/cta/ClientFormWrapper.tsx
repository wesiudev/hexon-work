"use client";
import { useDispatch, useSelector } from "react-redux";
import ClientForm from "./ClientFormDesign";
import { setModalVisible } from "@/common/redux/slices/actionSlice";
import { Providers } from "@/common/redux/Provider";
import SecondClientForm from "./SecondClientFormDesign";

export default function ClientFormWrapper({
  searchParams,
}: {
  searchParams: any;
}) {
  const dispatch = useDispatch();
  const { action } = useSelector((state: any) => state.action);
  function setModalVisibility(action: string) {
    dispatch(setModalVisible(action));
  }
  return (
    <>
      <ClientForm
        action={action}
        setAction={setModalVisibility}
        searchParams={searchParams}
      />
      <SecondClientForm
        action={action}
        setAction={setModalVisibility}
        searchParams={searchParams}
      />
    </>
  );
}
