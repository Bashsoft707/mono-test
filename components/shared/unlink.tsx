import { Fragment, useRef, useState } from "react";
import Image from "next/image";

// @ts-ignore
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { unlinkAccount } from "../../api/account";
import { selectAccountState } from "../../store/slices/account-slice";

interface Props {
  show: boolean;
  onClose: () => void;
  setUnlink: (value: boolean) => void;
  reload: () => void;
}

const UnlinkAccount: React.FC<Props> = ({
  show,
  onClose,
  reload,
  setUnlink,
}) => {
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);

  const accounts = useSelector(selectAccountState);

  const handleUnlink = async (id: string) => {
    setLoading(true);
    await unlinkAccount(id);
    reload();
    setUnlink(false);
    setLoading(false);
  };

  const Loading = () => (
    <div role="status" className="max-w-full animate-pulse p-3">
      {accounts?.map((_e, idx: number) => (
        <div
          className="h-10 bg-gray-200  dark:bg-gray-700 w-full mb-4"
          key={idx}
        ></div>
      ))}

      <span className="sr-only">Loading...</span>
    </div>
  );

  return (
    <Transition.Root
      show={show && accounts?.length ? true : false}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => true}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the UnlinkAccount contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                      <h3 className="lg:text-xl text-lg sm:text-sm md:text-md font-semibold text-gray-500 dark:text-white">
                        Select an account to Unlink
                      </h3>
                      <button
                        onClick={() => onClose()}
                        type="button"
                        className="text-gray-400 ml-20 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-right dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="defaultModal"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 "
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    {loading ? (
                      <Loading />
                    ) : (
                      <div className="mt-2">
                        <ul className="">
                          {accounts?.map((el, idx: number) => (
                            <li className="py-2 sm:py-3 border-b-2" key={idx}>
                              <div className="flex space-x-4">
                                <div className="flex-shrink-0">
                                  <Image
                                    className="h-12 w-12 rounded-full"
                                    src={el.bankLogo}
                                    alt={el.bankName}
                                  />
                                </div>
                                <div className="flex-1  min-w-0">
                                  <p className="text-md font-semibold text-gray-900 truncate">
                                    {el.bankName}
                                  </p>
                                </div>
                                <div
                                  className="inline-flex text-gray-500 cursor-pointer"
                                  onClick={() => handleUnlink(el.accountId)}
                                >
                                  &#10005;
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default UnlinkAccount;
