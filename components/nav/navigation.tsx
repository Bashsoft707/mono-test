import { IUserData } from "../../store/slices/user-slice";
import Image from "next/image";
import Profile from "../../public/Profile.png";

const Navigation = ({ user }: { user: IUserData }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Image
          className="rounded-full"
          src={Profile}
          alt="profile"
          width={40}
          height={40}
        />
        <div className="font-medium ">
          <div className="text-xs font-bold -ml-3 text-black ">
            Good morning, {user.firstName}
          </div>
        </div>
      </div>
      <div className="relative flex p-1 rounded-md cursor-pointer border border-gray-300">
        <p className="pr-2">Today</p>
        <Image src="./calenda.svg" alt="calendar" width={14} height={18} />
      </div>
    </div>
  );
};

export default Navigation;
