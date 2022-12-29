const Tracker = () => {
  const expensesHeight = [
    70, 110, 130, 70, 120, 70, 110, 70, 100, 110, 90, 120, 100, 120, 110, 100,
    80, 100, 110, 200, 90,
  ];

  const Line = (props: any) => {
    const { height } = props;
    return (
      <div
        style={{ height: `${height}px` }}
        className={`w-4 sm:w-6 md:w-6 lg:w-6 2xl:w-7  bg-[#157AFF] ${
          height < 200 ? "bg-[#9DC8ff] opacity-20" : " bg-[#157AFF]"
        } `}
      ></div>
    );
  };

  return (
    <div className="py-8">
      <div className="flex justify-center items-center py-10">
        <p className="text-lg font-bold">Expense Tracker</p>
      </div>
      <div
        id="main-chart"
        className="h-36 sm:p-2 md:p-0 overflow-hidden flex items-end space-x-1 lg:space-x-1 xl:space-x-2 2xl:space-x-2.5  "
      >
        {expensesHeight.map((height) => (
          <div className=" relative">
            <Line height={height} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracker;