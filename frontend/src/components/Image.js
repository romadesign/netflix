import { useState } from "react";

function Image({ datafiles, setFile }) {
    const [createObjectURL, setCreateObjectURL] = useState(null);

    const handleFileImage = e => {
        if (e.target.files && e.target.files[0]) {
            const i = e.target.files[0];
            console.log(i)
            if(createObjectURL === undefined){
              setFile(datafiles)
            }else{
              setFile(i);
              setCreateObjectURL(URL.createObjectURL(i));
            }
          }
    }
  
    return (
      <div className="py-3 flex justify-center items-center bg-gray-300 px-2">
        <div className="p-3 md:w-1/2 w-[360px] bg-white rounded-md">
          <div className="h-32 w-full relative border-2 items-center rounded-md cursor-pointer bg-gray-300 border-gray-400 border-dotted">
            <input
              type="file"
              onChange={handleFileImage}
              className="h-full w-full bg-green-200 opacity-0 z-10 absolute"
              multiple
              name="files[]"
            />
            <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
              <div className="flex flex-col">
                <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                <span className="text-[12px]">{`Image option one`}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="overflow-hidden relative">
              <img className="h-20 w-20 rounded-md" src={createObjectURL !== null ? createObjectURL : `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/`+datafiles} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Image
  