const Navigation = (props: any) => {
  const { user } = props;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          className="w-10 h-10 rounded-full"
          src="./Profile.png"
          alt="profile"
        />
        <div className="font-medium ">
          <div className="text-xs font-bold -ml-3 text-black ">
            Good morning, {user.firstName}
          </div>
        </div>
      </div>
      <div className="relative flex p-1 rounded-md cursor-pointer border border-gray-300">
        <p className="pr-2">Today</p>
        {/* <img src="./calenda.svg" alt="calenda" /> */}
      </div>
    </div>
  );
};

export default Navigation;
