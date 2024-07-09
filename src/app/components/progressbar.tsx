"use client";

const ProgressBar = ({ filename, percentage }: any) => {
    return (
        <>  
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-10">
                    <p className="text-[11px] font-normal inline-flex text-gray-600">{filename}</p>
                    <p className="text-[11px] font-normal inline-flex text-purple-700 ml-2">{percentage}%</p>
                    <div className="progress-bg">
                        <div className="progress" style={{ width: `${percentage}%` }} />
                    </div>
                </div>

                <div className="col-span-2 ml-2">

                </div>
            </div> 
        </>
    );
};
  
export default ProgressBar;