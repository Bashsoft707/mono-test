import React, { useEffect, useState } from "react";
// @ts-ignore
import Connect from "@mono.co/connect.js";
// import { useSelector } from "react-redux";
// import { getAccounts, getTrx, LinkAccount } from "../api/account";
// import { useDispatch } from "react-redux";
import { storeAccount, storeUserData, storeTrx } from "../store/actions";
import Loader from "../components/shared/loader";
// import UnlinkAccount from "../components/shared/unlink";
// import Confirm from "../components/shared/confirm";
import { deleteUser } from "../api/user";
import SideBar from "../components/nav/side-nav";
// import Tracker from "./Tracker";
import Navigation from "../components/nav/navigation";
// import Transaction from "./Transactions";
// import Balance from "./Balance";
// import LinkAcc from "./LinkAccount";
import CONSTANT from "../constant";
// import {
//   Balance,
//   Tracker,
//   Transactions,
//   LinkAccounts,
// } from "../components/home";
import { useSelector, useDispatch } from "react-redux";
import { Transaction } from "../components/home/transactions";
import Router from "next/router";
import { logoutUser, selectUserState, setUserState } from "../store/slices/user-slice";
import { selectAccountState, setAccountState } from "../store/slices/account-slice";
import { selectTransactionState, setTransactionState } from "../store/slices/transaction-slice";

const Home = () => {
  //state hooks
  const [reload, setReload] = useState(false);
  const [UNLINK, setUnlink] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openConfirm, setConfirm] = useState<boolean>(false);

  //useEffect

  const user = useSelector(selectUserState)
  const accounts = useSelector(selectAccountState)
  const transactions = useSelector(selectTransactionState)

  useEffect(() => {
    if (!user._id) Router.push("/login");
    ((async) => {
      // handleFetchData();
    })();
  }, [reload]);

  //dispatch
  const dispatch = useDispatch();

  // const handleFetchData = async () => {
  //   setLoading(true);
  //   const acct = await getAccounts();
  //   dispatch<any>(storeAccount(acct.accounts));
  //   if (acct?.accounts?.length) {
  //     const res = await getTrx(acct.accounts[0].accountId);
  //     dispatch<any>(storeTrx(res.data.trx.data));
  //   }

  //   setLoading(false);
  // };

  // const handleConnect = () => {
  //   const connect = new Connect({
  //     key: CONSTANT.MONO_PK,
  //     onSuccess: async (data: any) => {
  //       setLoading(true);
  //       await LinkAccount({ code: data.code });
  //       setReload(!reload);
  //     },
  //   });

  //   connect.setup();
  //   connect.open();
  // };

  const handleDeleteAccount = async () => {
    setConfirm(false);
    // setLoading(true);
    const data = await deleteUser();
    console.log({ data });
    if (data.success) {
      window.localStorage.removeItem("token");
      dispatch<any>(
        setUserState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        })
      );
      dispatch<any>(setTransactionState([]));
      dispatch<any>(setAccountState([]));
    }
    setReload(!reload);
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("token");
    dispatch<any>(logoutUser());
    // dispatch<any>(storeTrx([]));
    // dispatch<any>(storeAccount([]));
    setReload(!reload);
  };

  return (
    <div>
      {/* {UNLINK && (
        <UnlinkAccount
          setUnlink={setUnlink}
          onClose={() => setUnlink(false)}
          show={true}
          reload={() => setReload(!reload)}
        />
      )} */}
      {loading && <Loader />}

      {/* <Confirm
        open={openConfirm}
        close={() => setConfirm(false)}
        confirm={handleDeleteAccount}
      /> */}

      <div className="flex overflow-hidden bg-white">
        <SideBar
          accounts={accounts}
          handleLogout={handleLogout}
          setConfirm={setConfirm}
        />

        {accounts?.length && (
          <div
            id="main-content"
            className="h-full pl-8 w-full marker:relative overflow-y-auto lg:ml-[248px]"
          >
            <main>
              <div className="px-4">
                <div className="w-full grid grid-cols-1 lg:grid-cols-9  ">
                  <div className="bg-white mt-8 mr-10 col-span-5 ">
                    <Navigation user={user} />
                    {/* <Tracker /> */}
                    <Transaction trx={transactions} />
                  </div>
                  {/* <Balance
                    accounts={accounts}
                    setUnlink={setUnlink}
                    handleConnect={handleConnect}
                  /> */}
                </div>
              </div>
            </main>
          </div>
        )}
        {/* {!accounts?.length && <LinkAccounts handleConnect={handleConnect} />} */}
      </div>
    </div>
  );
};

export default Home;
