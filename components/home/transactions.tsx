export const Transaction = (props: any) => {
  const { trx } = props;

  const images = ["cart", "bus", "house", "lamp", "play"];

  return (
    <div className="">
      <div className="bg-white h-full">
        <div className="flex items-center justify-between p-3 mb-4  border-b border-gray-200">
          <p className="text-lg font-light leading-none text-gray-900">
            Latest Transactions{" "}
          </p>
          <div className="p-2 ">
            <p className="text-lg ml-4 cursor-pointer text-gray-300 font-extrabold leading-6 ">
              . . .
            </p>
          </div>
        </div>
        <div className="flow-root">
          <ul className="">
            {trx.map((el: any, i: number) => (
              <li className="py-2 sm:py-3">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={`../${images[i] || "addbank"}.svg`}
                      alt={el.name}
                    />
                  </div>
                  <div className="flex-1  min-w-0">
                    <p className="text-md font-semibold text-gray-900 truncate">
                      {el.narration.slice(0, 20)}
                    </p>
                    <p className="text-sm mt-1 text-[#404852] opacity-50 truncate">
                      <span>{el.date} </span>
                      <span>• {el.time} </span>
                      <span>• {el.type}</span>
                    </p>
                  </div>
                  <div className="inline-flex text-lg items- text-left font-bold text-[#273240]">
                    -{el.amount}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center cursor-pointer">
          <p className="text-[#404852] font-light text-xs">VIEW ALL</p>
          <p className="text-[#404852] font-light text-xs"> &gt;</p>
        </div>
      </div>
    </div>
  );
};
