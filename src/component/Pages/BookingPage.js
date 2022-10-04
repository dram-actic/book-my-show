import React from "react";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu, Transition } from '@headlessui/react'
import { Dialog } from '@headlessui/react'
import DataBase from "./DataBase";




function BookingPage(props) {




    let movieId = useParams();
    const [detailsMovie, setDetails] = useState([]);
    useEffect(() => {
        const requestDetails = async () => {
            const requestedDetails = await axios.get(`/movie/${movieId.id}`);
            setDetails(requestedDetails.data);
        }
        requestDetails();
    }, []);




    const [seatType, setSeatType] = useState("Seat Type");
    const [seatNumberOfSeats, setNumberOfSeats] = useState(0);
    const [StandardSeatSectionOne, setStandardSeatSectionOne] = useState(DataBase);
    const [StandardSeatSectiontwo, setStandardSeatSectiontwo] = useState(DataBase);
    const [PremiumSeatSectionOne, setPremiumSeatSectionOne] = useState(DataBase);
    const [PremiumSeatSectionTwo, setPremiumSeatSectionTwo] = useState(DataBase);
    const seatsAndType = {
        "seats": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "types": ["Standard", "Premium"]
    };

    let [BookingPopup, setBookingPopup] = useState(false)

    function closeModal() {
        setBookingPopup(false)
    }

    function openModal() {
        setBookingPopup(true)
    }




    return (
        <>
            <div className="bg-[#1f2533] text-white  w-full py-2 ">
                <div className="flex justify-between lg:w-3/4 w-full m-auto px-4 md:flex-row flex-col gap-4">


                    <div className=" text-4xl">
                        Movie Name :  {detailsMovie.title}
                    </div>


                    <div className="flex gap-4 justify-end items-center">
                        <Menu as="div" className="relative inline-block text-left">


                            <div>
                                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                    {seatType}
                                </Menu.Button>
                            </div>


                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95">
                                <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                        {
                                            seatsAndType["types"].map((type) => (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button onClick={() => (setSeatType(type), setNumberOfSeats(0))}
                                                            className={`${active ? 'bg-[#1f2533] text-white' : 'text-[#1f2533]'}  group flex w-full items-center text-right rounded-md px-10 py-2 text-sm`}>
                                                            {
                                                                type
                                                            }
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))
                                        }
                                    </div>
                                </Menu.Items>
                            </Transition>


                        </Menu>



                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center">
                                <button type="button" onClick={openModal}
                                    className="px-4 py-2 marker:justify-center rounded-md bg-black bg-opacity-50  text-lg font-bold text-white hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                    Book Tickets
                                </button>
                            </div>
                        </div>


                        <Transition appear show={BookingPopup} as={Fragment}>


                            <Dialog as="div" className="relative z-10" onClose={closeModal}>


                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                                </Transition.Child>


                                <div className="fixed inset-0 overflow-y-auto">


                                    <div className="flex min-h-full items-center justify-center p-4 text-center">


                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95">
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">


                                                <div className="flex gap-4">


                                                    <div className="w-1/2">
                                                        <img className="w-full" src={`https://image.tmdb.org/t/p/original${detailsMovie.poster_path}`} alt="" />
                                                    </div>


                                                    <div className="w-1/2 flex flex-col justify-between">


                                                        <div className="flex flex-col gap-1">
                                                            <div className="font-semibold text-xl">
                                                                {detailsMovie.title}
                                                            </div>
                                                            <div className="font-semibold">
                                                                {parseInt(detailsMovie.runtime / 60)}h {detailsMovie.runtime % 60}m
                                                            </div>
                                                            <div className="text-red-900 px-2 rounded-sm flex flex-nowrap text-xs bg-[#E5E5E5]">
                                                                2D, 3D, IMAX 2D, 4DX 3D, IMAX 3D, 4DX
                                                            </div>
                                                            <div className="text-blue-900 px-2 rounded-sm flex flex-nowrap text-xs bg-[#E5E5E5]">
                                                                English, Hindi, Kannada, Tamil, Malayalam, Telugu
                                                            </div>
                                                        </div>


                                                        <div className="flex flex-col gap-0 text-gray-500">
                                                            <div className="flex justify-between items-center">
                                                                <div className="text-sm">
                                                                    Seat Type :
                                                                </div>
                                                                <div className="font-semibold">
                                                                    {seatType}
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <div className="text-sm">
                                                                    Number Of Seats :
                                                                </div>
                                                                <div className="font-semibold">
                                                                    {seatNumberOfSeats}
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <div className="text-sm">
                                                                    Total(Rs) :
                                                                </div>
                                                                <div className="font-semibold">
                                                                    {((seatType === "Standard") ? 300 : 500) * (seatNumberOfSeats)}
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <button className="bg-red-700 md:text-lg text-sm font-semibold md:px-6 md:py-2 px-3 py-1 md:rounded-lg rounded text-white" >Book tickets</button>


                                                    </div>


                                                </div>


                                            </Dialog.Panel>


                                        </Transition.Child>


                                    </div>


                                </div>


                            </Dialog>


                        </Transition>


                    </div>


                </div>

            </div>




            <div className="lg:w-3/4 w-full m-auto">


                <div className="flex flex-col gap-4 pt-4 px-4">


                    <div className="text-slate-500 text-sm">
                        STANDARD-Rs. 300.00
                        <hr />
                    </div>


                    <div className="flex flex-row justify-evenly flex-nowrap">


                        <div className="grid grid-cols-10 gap-2">
                            {
                                Object.keys(StandardSeatSectionOne).map((idx) => (
                                    <>


                                        <div className={`${((StandardSeatSectionOne[parseInt(idx)] == 2) || (seatType === "Premium")) ? "" : "hidden"} rounded-sm  w-6 h-6 hover:cursor-not-allowed bg-slate-200 `}>
                                        </div>


                                        <div className={`${((StandardSeatSectionOne[parseInt(idx)] == 2) || (seatType === "Premium")) ? "hidden" : ""}`}>


                                            <button type="button" onClick={() => (setStandardSeatSectionOne({ ...StandardSeatSectionOne, [parseInt(idx)]: ((StandardSeatSectionOne[parseInt(idx)] == 1) || (seatType === "Seat Type")) ? 0 : 1 }))}
                                                className={`${(StandardSeatSectionOne[parseInt(idx)] == 1) ? "bg-green-600 text-white" : "text-green-600 hover:bg-green-500 hover:text-white"} flex items-center justify-center border-[1px] border-green-600 rounded-sm  w-6 h-6 text-[0.7rem] ${(seatType === "Seat Type") ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}  `}>
                                                {
                                                    (parseInt(idx) % 10) + 1
                                                }
                                            </button>


                                        </div>
                                    </>
                                ))
                            }
                        </div>


                        <div className="grid grid-cols-10 gap-2">
                            {
                                Object.keys(StandardSeatSectiontwo).map((idx) => (
                                    <>
                                        <div className={`${((StandardSeatSectiontwo[parseInt(idx)] == 3) || (seatType === "Premium")) ? "" : "hidden"} rounded-sm  w-6 h-6 hover:cursor-not-allowed bg-slate-200 `}>
                                        </div>
                                        <div className={`${((StandardSeatSectiontwo[parseInt(idx)] == 3) || (seatType === "Premium")) ? "hidden" : ""}`}>
                                            <button type="button" onClick={() => (setStandardSeatSectiontwo({ ...StandardSeatSectiontwo, [parseInt(idx)]: ((StandardSeatSectiontwo[parseInt(idx)] == 1) || (seatType === "Seat Type")) ? 0 : 1 }))}
                                                className={`${(StandardSeatSectiontwo[parseInt(idx)] == 1) ? "bg-green-600 text-white" : "text-green-600 hover:bg-green-500 hover:text-white"} flex items-center justify-center border-[1px] border-green-600 rounded-sm  w-6 h-6 text-[0.7rem] hover:cursor-pointer ${(seatType === "Seat Type") ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}`}>
                                                {
                                                    (parseInt(idx) % 10) + 1
                                                }
                                            </button>
                                        </div>
                                    </>
                                ))
                            }
                        </div>


                    </div>


                    <div className="text-slate-500 text-sm">
                        PREMIUM-Rs. 500.00
                        <hr />
                    </div>


                    <div className="flex flex-row justify-evenly flex-nowrap">


                        <div className="grid grid-cols-10 gap-2">
                            {
                                Object.keys(PremiumSeatSectionOne).map((idx) => (
                                    <>
                                        <div className={`${(PremiumSeatSectionOne[parseInt(idx)] == 4) || (seatType === "Standard") ? "" : "hidden"} rounded-sm  w-6 h-6 hover:cursor-not-allowed bg-slate-200 `}>
                                        </div>
                                        <div className={`${(PremiumSeatSectionOne[parseInt(idx)] == 4) || (seatType === "Standard") ? "hidden" : ""}`}>
                                            <button type="button" onClick={() => (setPremiumSeatSectionOne({ ...PremiumSeatSectionOne, [parseInt(idx)]: ((PremiumSeatSectionOne[parseInt(idx)] == 1) || (seatType === "Seat Type")) ? 0 : 1 }))}
                                                className={`${(PremiumSeatSectionOne[parseInt(idx)] == 1) ? "bg-green-600 text-white" : "text-green-600 hover:bg-green-500 hover:text-white"} flex items-center justify-center border-[1px] border-green-600 rounded-sm  w-6 h-6 text-[0.7rem] hover:cursor-pointer ${(seatType === "Seat Type") ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}`}>
                                                {
                                                    (parseInt(idx) % 10) + 1
                                                }
                                            </button>
                                        </div>
                                    </>
                                ))
                            }
                        </div>


                        <div className="grid grid-cols-10 gap-2">
                            {
                                Object.keys(PremiumSeatSectionTwo).map((idx) => (
                                    <>
                                        <div className={`${((PremiumSeatSectionTwo[parseInt(idx)] == 5) || (seatType === "Standard")) ? "" : "hidden"} rounded-sm  w-6 h-6 hover:cursor-not-allowed bg-slate-200 `}>
                                        </div>
                                        <div className={`${((PremiumSeatSectionTwo[parseInt(idx)] == 5) || (seatType === "Standard")) ? "hidden" : ""}`}>
                                            <button type="button" onClick={() => (setPremiumSeatSectionTwo({ ...PremiumSeatSectionTwo, [parseInt(idx)]: ((PremiumSeatSectionTwo[parseInt(idx)] == 1) || (seatType === "Seat Type")) ? 0 : 1 }))}
                                                className={`${(PremiumSeatSectionTwo[parseInt(idx)] == 1) ? "bg-green-600 text-white" : "text-green-600 hover:bg-green-500 hover:text-white"} flex items-center justify-center border-[1px] border-green-600 rounded-sm  w-6 h-6 text-[0.7rem] hover:cursor-pointer ${(seatType === "Seat Type") ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}`}>
                                                {
                                                    (parseInt(idx) % 10) + 1
                                                }
                                            </button>
                                        </div>
                                    </>
                                ))
                            }
                        </div>


                    </div>


                </div>


                <div className="lg:w-3/4 w-full m-auto flex flex-col gap-4 justify-center py-10">


                    <div className="text-center text-slate-700">
                        All eyes this way please!
                    </div>


                    <div className="flex gap-4 justify-center text-sm">

                        <div className="bg-slate-200 rounded-sm  w-6 h-6"></div>

                        <div>Sold</div>

                        <div className="border-[1px] border-green-600 rounded-sm  w-6 h-6"></div>

                        <div>Available</div>

                        <div className="bg-green-600 rounded-sm  w-6 h-6"></div>

                        <div>Selected</div>

                    </div>


                </div>


            </div>
        </>
    )
}
export default BookingPage;