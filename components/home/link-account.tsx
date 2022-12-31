import Image from "next/image";

interface LinkAccountProps {
  handleConnect: () => void;
}

const LinkAccounts: React.FC<LinkAccountProps> = ({ handleConnect }) => {
  return (
    <div className="flex justify-center p-2 items-center w-full h-screen lg:ml-[300px]">
      <div className="flex flex-col justify-center items-center px-4 md:px-12 py-8 max-w-sm bg-[#101010] rounded-lg border border-gray-200 shadow-md  ">
        <Image src="./padlock.svg" alt="lock" width={60} height={60} />
        <p className="text-3xl text-white font-light p-4">Final Step</p>
        <p className="text-md text-white m-4">
          Link your Bank Account in seconds
        </p>
        <button
          type="submit"
          onClick={() => handleConnect()}
          className="flex  items-center justify-center bg-white mt-7 px-6 p-2 uppercase text-md rounded-sm text-[#182CD1] font-semibold ring-0 hover:shadow-sm hover:shadow-white"
        >
          LINK NOW <Image className="ml-2" src="./arrow.svg" alt="arrow" width={10} height={10} />
        </button>
      </div>
    </div>
  );
};

export default LinkAccounts;
