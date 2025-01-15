import React from 'react'
import middlesectionimage from '../../assets/images/Fall is coming-rafiki.svg'
import image from "../../assets/images/Screenshot (482).png";
import map from "../../assets/images/map.png";
const MiddleSection = () => {
  return (
    <div className='flex mx-20 p-2 justify-between'>
        <div className="flex w-[50%] items-center p-2 my-20 mx-0 bg-gradient dark:bg-darkmiddle justify-between">
        <div className='flex  '>
        <img src={middlesectionimage} alt='' height={80} width={80}  />
            <div className='flex-col'>
                <h2 className='text-[20px] font-semibold'>Find Nearby</h2>
                <p>Restaurant Near from You</p>
            </div>
            <div className='relative flex-col items-baseline justify-center mx-4'>
                <div className='relative flex items-center justify-center -my-2 z-30'>
                <img src={map} alt='' width={30} height={30}/>
                </div>
                    <button className='mx-2 p-2 bg-orange-500 rounded-lg '>
                        See Location
                        </button>
                
            </div>

        </div>

    </div>

    {/* <div style={{
        background: "linear-gradient(to top,#f7dbc8,#ffffff)", // Gradient from orange to yellow
        padding: "20px",
        borderRadius: "10px",
        }} className='mx-4 flex items-center p-2 bg-gradient-'>
        <div className='flex'>
        <img src={image} alt='' height-60 weight-60 />
            <div className='relative flex-col items-baseline justify-center mx-4'>
                <div className='relative flex items-center justify-center -my-2 z-50'>
                <img src={map} alt='' width={30} height={30}/>
                </div>
                    <button className='mx-2 p-2 bg-orange-500 rounded-lg '>
                        Refer Now
                        </button>
                
            </div>

        </div>

    </div> */}

    <div className='flex flex-row p-20 -mx-10 w-[60%] bg-[#f5f6f8] dark:bg-background rounded-md  '>
        <div className=''>
            <img src={image} alt='refer now' className='rounded-md' />
        </div>
        <div className='-ml-4 flex justify-center items-center bg-gradientmid rounded-md p-4'>
            <button className=' p-3 bg-white justify-center text-orange-500 font-semibold text-[12px] rounded-lg items-center h-fit w-fit whitespace-nowrap'>Refer Now</button>
        </div>
        
    </div>



    </div>

  )
}

export default MiddleSection