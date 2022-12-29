const sidebarMenu = [
  { menu: "Dashboard", id: 1 },
  { menu: "Expenses", id: 2 },
  { menu: "Wallets", id: 3 },
  { menu: "Summary", id: 4 },
  { menu: "Accounts", id: 5 },
  { menu: "Settings", id: 6 },
];

const SideBar = (props: any) => {
  const { accounts, handleLogout, setConfirm } = props;

  return (
    <aside
      id="sidebar"
      className="fixed hidden z-20 h-full top-0 left-0 lg:flex flex-shrink-0 flex-col w-[246px] transition-width duration-75"
      aria-label="Sidebar"
    >
      <div
        className={`relative flex-1 flex flex-col min-h-0 ${
          accounts?.length ? "bg-[#101010] " : "bg-[#515151] "
        }  pt-0`}
      >
        {!accounts?.length && (
          <div className="mb-4">
            <div className="flex p-6  ">
              <img src="./Group.svg" className="h-5 -mr-4" alt="Mono Logo" />
            </div>
          </div>
        )}

        {accounts?.length ? (
          <div className="px-3 py-6 mt-6 lg:px-5 lg:pl-3 ">
            <div className="flex items-center justify-center">
              <img src="./Group.svg" className="h-5 -mr-4" alt="Mono Logo" />
            </div>
          </div>
        ) : (
          <div />
        )}
        {accounts?.length ? (
          <div className="flex-1 flex flex-col items-center justify-center pt-5 pb-4 overflow-y-auto ">
            <div className="flex-1 px-3  divide-y space-y-1 w-full">
              <ul className="space-y-8 ">
                {sidebarMenu.map((menu, idx) => (
                  <li
                    className="text-white text-lg font-light  text-center cursor-pointer"
                    key={idx}
                  >
                    {menu.menu}
                  </li>
                ))}
                <li className="w-full">
                  <button
                    onClick={handleLogout}
                    className="bg-transparent w-full hover:bg-white text-white hover:text-blue-500 py-2 px-4 border border-white hover:border-transparent rounded"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div />
        )}

        {!accounts?.length && (
          <div
            role="status"
            className="max-w-sm animate-pulse p-6 flex flex-col"
          >
            <div className="h-1.5 bg-gray-200 rounded-full self-end w-9/12 mb-5"></div>
            <div className="h-1.5 bg-gray-200 rounded-full max-w-[360px] w-9/12 mb-5"></div>
            <div className="h-1.5 bg-gray-200 rounded-full  mb-5"></div>
            <div className="h-1.5 bg-[#5D66B0] rounded-full max-w-[330px] mb-5"></div>

            <span className="sr-only">Loading...</span>
          </div>
        )}
        {accounts?.length ? (
          <div className="p-4">
            <button
              onClick={() => setConfirm(true)}
              type="submit"
              className="w-full hover:border hover:before:border-red-300  hover:text-white my-4 py-2 uppercase text-md rounded-lg text-[#F22828] "
            >
              Delete Account
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>
    </aside>
  );
};

export default SideBar;
