"use client";
import axios from 'axios';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, Chip } from "@nextui-org/react";
import React from 'react';
import { PaginationItem, PaginationCursor } from "@nextui-org/react";
import Image from 'next/image';
import moment from 'moment';
import Loading from '../loading';
import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";
import { PatchApplicationHeader } from '../actions/actionForm';
import Report from "@/app/components/application_report_main";
import { LuFileEdit } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";

const MainBody = ({ session, header }: any) => {

  const access_Token = session.accessToken;

  const headers = {
    Authorization: `Bearer ${access_Token}`
  }

  const fetcher = async (url: any) => {
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` } });
    const data = await response.data;
    return data;
  };

  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [searchTerm3, setSearchTerm3] = useState('');
  const [tabState, setTabState]: any = useState('N');

  const [formData, setFormData] = useState({
    recruitmentID: '',
    trackingStatus: '',
  });

  const handleSubmitTrackingStatus = async (recruitmentID: any) => {
    formData.recruitmentID = recruitmentID;
    formData.trackingStatus = 'R';
    await PatchApplicationHeader(formData);
  };

  const { data: data1, error: error1 } = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/rms/admin/all', fetcher);
  const { data: data2, error: error2 } = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/rms/admin/all_accept', fetcher);
  const { data: data3, error: error3 } = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/rms/admin/all_reject', fetcher);

  if (error1 || error2 || error3) return <div>Error fetching data</div>;
  if (!data1 || !data2 || !data3) return <Loading />;

  const filteredData1 = data1.filter((item: any) =>
    item.firstnameeng?.toLowerCase().includes(searchTerm1.toLowerCase()) ||
    item.lastnameeng?.toLowerCase().includes(searchTerm1.toLowerCase()) ||
    item.positionDesired?.toLowerCase().includes(searchTerm1.toLowerCase()) ||
    item.registrationDate?.toLowerCase().includes(searchTerm1.toLowerCase()) ||
    (item.expectedSalary?.toString() || '').toLowerCase().includes(searchTerm1.toLowerCase()) ||
    item.startingDate?.toLowerCase().includes(searchTerm1.toLowerCase()) ||
    item.rmsEducation?.some((edu: any) => edu.education.toLowerCase().includes(searchTerm1.toLowerCase())) ||
    item.rmsEducation?.some((edu: any) => edu.major.toLowerCase().includes(searchTerm1.toLowerCase())) ||
    item.rmsEducation?.some((edu: any) => edu.institute.toLowerCase().includes(searchTerm1.toLowerCase()))
  );

  const filteredData2 = data2.filter((item: any) =>
    item.firstnameeng?.toLowerCase().includes(searchTerm2.toLowerCase()) ||
    item.lastnameeng?.toLowerCase().includes(searchTerm2.toLowerCase()) ||
    item.positionDesired?.toLowerCase().includes(searchTerm2.toLowerCase()) ||
    item.registrationDate?.toLowerCase().includes(searchTerm2.toLowerCase()) ||
    (item.expectedSalary?.toString() || '').toLowerCase().includes(searchTerm2.toLowerCase()) ||
    item.startingDate?.toLowerCase().includes(searchTerm2.toLowerCase()) ||
    item.rmsEducation?.some((edu: any) => edu.education.toLowerCase().includes(searchTerm2.toLowerCase())) ||
    item.rmsEducation?.some((edu: any) => edu.major.toLowerCase().includes(searchTerm2.toLowerCase())) ||
    item.rmsEducation?.some((edu: any) => edu.institute.toLowerCase().includes(searchTerm2.toLowerCase()))
  );

  const filteredData3 = data3.filter((item: any) =>
    item.firstnameeng?.toLowerCase().includes(searchTerm3.toLowerCase()) ||
    item.lastnameeng?.toLowerCase().includes(searchTerm3.toLowerCase()) ||
    item.positionDesired?.toLowerCase().includes(searchTerm3.toLowerCase()) ||
    item.registrationDate?.toLowerCase().includes(searchTerm3.toLowerCase()) ||
    (item.expectedSalary?.toString() || '').toLowerCase().includes(searchTerm3.toLowerCase()) ||
    item.startingDate?.toLowerCase().includes(searchTerm3.toLowerCase()) ||
    item.rmsEducation?.some((edu: any) => edu.education.toLowerCase().includes(searchTerm3.toLowerCase())) ||
    item.rmsEducation?.some((edu: any) => edu.major.toLowerCase().includes(searchTerm3.toLowerCase())) ||
    item.rmsEducation?.some((edu: any) => edu.institute.toLowerCase().includes(searchTerm3.toLowerCase()))
  );

  return (
    <>
      <div className="container mx-auto pb-8 px-8">
        <div className="grid grid-cols-12 gap-2 mt-4 mb-5">
          <div className="col-span-12">
            <div className="grid grid-cols-12">
              <div className="col-span-3 text-center bg-white border shadow-sm rounded-md px-1 py-3">
                <Tabs
                  aria-label="Options"
                  variant="solid"
                  radius="full"
                  classNames={{
                    tabList: "w-full relative rounded-md gap-0 p-0 border-divider hide-scrollbar",
                    cursor: "w-full bg-[#7e3af2]",
                    tab: "max-w-fit mx-[15px] h-9",
                    tabContent: "group-data-[selected=true]:text-[#ffffff]"
                  }}
                  onSelectionChange={setTabState}
                >
                  <Tab
                    key="All"
                    title={
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold">All</span>
                      </div>
                    }
                  />
                  <Tab
                    key="Accept"
                    title={
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold">Accept</span>
                      </div>
                    }
                  />
                  <Tab
                    key="Reject"
                    title={
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold">Reject</span>
                      </div>
                    }
                  />
                </Tabs>
              </div>
            </div>
          </div>
        </div>

        {
          tabState === 'All' ?
            <>
              <div className="bg-white border shadow-sm rounded-md px-1 py-3">
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-9 px-5 pt-3">
                    <p className="text-sm font-bold text-gray-700">Application</p>
                    <p className="text-xs text-gray-500 inline-flex">total <p className="text-purple-600 font-bold px-1">{filteredData1.length}</p> item</p>
                  </div>

                  <div className="col-span-3">
                    <div className="flex flex-col p-4 rounded-md">
                      <input
                        type="text"
                        placeholder="search"
                        value={searchTerm1}
                        onChange={(e) => setSearchTerm1(e.target.value)}
                        className="bg-gray-100 rounded-lg border-0 focus:ring-purple-600 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-12">
                    {filteredData1?.map((item: any) => (
                      <div key={item.recruitmentID}>
                        <div className="grid grid-cols-12 gap-2 transition ease-out hover:-translate-x-1 hover:bg-white hover:border hover:rounded-md hover:scale-105 duration-300">
                          <div className="col-span-4">
                            <div className="flex items-center pl-5 py-4 text-gray-900 dark:text-white">
                              <Image style={{ borderRadius: 100, width: 80, height: 80, objectFit: 'cover' }} src={item.imageBase64} alt="Jese image" width={80} height={80} />
                              <div className="ps-3 break-words">
                                <div className="text-[15px] font-semibold">{item.positionDesired}</div>
                                <div className="text-xs font-semibold">{item.firstnameeng} {item.lastnameeng}</div>

                                <div className="text-[11px] font-bold mt-2 mb-[1px] text-purple-700">Expected Salary</div>
                                <div className="text-[11px] font-normal">
                                  {Intl.NumberFormat('th-TH', {
                                    style: 'currency',
                                    currency: 'THB',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).format(item.expectedSalary)} THB</div>
                              </div>
                            </div>
                          </div>

                          <div className="col-span-3">
                            <div className="items-center px-1 py-4 text-gray-900 dark:text-white">
                              <div className="text-[11px] font-bold mb-[1px] text-purple-700">Education</div>
                              <div className="text-[11px] font-normal">{item.rmsEducation?.map((item1: any) => (
                                <div key={item1.recruitmentID} className="break-words">
                                  {
                                    item1.education === 'Bachelor’s / ปริญญาตรี' ?
                                      <>
                                        {item1.education}<br></br>
                                        {item1.major}<br></br>
                                        {item1.institute}
                                      </>
                                      :
                                      <></>
                                  }
                                </div>
                              ))}
                              </div>
                            </div>
                          </div>

                          <div className="col-span-2">
                            <div className="flex items-center px-1 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                              <div className="ps-3">
                                <div className="text-[11px] font-bold mb-[1px] text-purple-700">Applicant Date</div>
                                <div className="text-[11px] font-normal mb-4">{moment(item.registrationDate).format('DD MMM YYYY')}</div>

                                <div className="text-[11px] font-bold mb-[1px] text-purple-700">Starting Date</div>
                                <div className="text-[11px] font-normal">{moment(item.startingDate).format('DD MMM YYYY')}</div>
                              </div>
                            </div>
                          </div>

                          <div className="col-span-2">
                            <div className="flex items-center px-1 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                              <div className="">
                                <div className="mb-2" onClick={() => handleSubmitTrackingStatus(item.recruitmentID)}>
                                  <Report data={item} />
                                </div>

                                <div className="">
                                  <Link href="" className="inline-flex bg-amber-100 hover:bg-amber-200 font-medium px-3 py-3 rounded-md text-xs text-center cursor-pointer text-amber-800" as={`/main/application_form/${item.recruitmentID}`}><LuFileEdit className="inline-flex w-4 h-4 text-amber-800 mr-2" /> View</Link>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-span-1">
                            <div className="flex items-center pr-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                              <div className="">
                                {
                                  item.trackingStatus === 'R' ?
                                    <>
                                      <p className="text-[12px] font-bold mt-7 text-green-600">Read</p>
                                    </>
                                    :
                                    <>
                                      <p className="text-[12px] font-bold mt-7 text-red-600">Unread</p>
                                    </>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
            :
            tabState === 'Accept' ?
              <>
                <div className="bg-white border shadow-sm rounded-md px-1 py-3">
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-9 px-5 pt-3">
                      <p className="text-sm font-bold text-gray-700">Application</p>
                      <p className="text-xs text-gray-500 inline-flex">total <p className="text-purple-600 font-bold px-1">{filteredData2.length}</p> item</p>
                    </div>

                    <div className="col-span-3">
                      <div className="flex flex-col p-4 rounded-md">
                        <input
                          type="text"
                          placeholder="search"
                          value={searchTerm2}
                          onChange={(e) => setSearchTerm2(e.target.value)}
                          className="bg-gray-100 rounded-lg border-0 focus:ring-purple-600 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-12">
                      {filteredData2?.map((item: any) => (
                        <div key={item.recruitmentID}>
                          <div className="grid grid-cols-12 gap-2 transition ease-out hover:-translate-x-1 hover:bg-white hover:border hover:rounded-md hover:scale-105 duration-300">
                            <div className="col-span-4">
                              <div className="flex items-center pl-5 py-4 text-gray-900 dark:text-white">
                                <Image style={{ borderRadius: 100, width: 80, height: 80, objectFit: 'cover' }} src={item.imageBase64} alt="Jese image" width={80} height={80} />
                                <div className="ps-3 break-words">
                                  <div className="text-[15px] font-semibold">{item.positionDesired}</div>
                                  <div className="text-xs font-semibold">{item.firstnameeng} {item.lastnameeng}</div>

                                  <div className="text-[11px] font-bold mt-2 mb-[1px] text-purple-700">Expected Salary</div>
                                  <div className="text-[11px] font-normal">
                                    {Intl.NumberFormat('th-TH', {
                                      style: 'currency',
                                      currency: 'THB',
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    }).format(item.expectedSalary)} THB</div>
                                </div>
                              </div>
                            </div>

                            <div className="col-span-3">
                              <div className="items-center px-1 py-4 text-gray-900 dark:text-white">
                                <div className="text-[11px] font-bold mb-[1px] text-purple-700">Education</div>
                                <div className="text-[11px] font-normal">{item.rmsEducation?.map((item1: any) => (
                                  <div key={item1.recruitmentID} className="break-words">
                                    {
                                      item1.education === 'Bachelor’s / ปริญญาตรี' ?
                                        <>
                                          {item1.education}<br></br>
                                          {item1.major}<br></br>
                                          {item1.institute}
                                        </>
                                        :
                                        <></>
                                    }
                                  </div>
                                ))}
                                </div>
                              </div>
                            </div>

                            <div className="col-span-2">
                              <div className="flex items-center px-1 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="ps-3">
                                  <div className="text-[11px] font-bold mb-[1px] text-purple-700">Applicant Date</div>
                                  <div className="text-[11px] font-normal mb-4">{moment(item.registrationDate).format('DD MMM YYYY')}</div>

                                  <div className="text-[11px] font-bold mb-[1px] text-purple-700">Starting Date</div>
                                  <div className="text-[11px] font-normal">{moment(item.startingDate).format('DD MMM YYYY')}</div>
                                </div>
                              </div>
                            </div>

                            <div className="col-span-1">
                              <div className="flex items-center px-1 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="">
                                  <div className="mt-4">
                                    <Link href="" className="inline-flex bg-amber-100 hover:bg-amber-200 font-medium px-3 py-3 rounded-md text-xs text-center cursor-pointer text-amber-800" as={`/main/application_form/${item.recruitmentID}`}><LuFileEdit className="inline-flex w-4 h-4 text-amber-800 mr-2" /> View</Link>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-span-2">
                              <div className="flex items-center pr-6 text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="ps-3">
                                  <span className="relative inline-flex h-3 w-3 mt-9">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                  </span>
                                </div>
                                <div className="ps-3">
                                  <p className="text-[11px] font-bold mt-9 text-red-600">Delete on date</p>
                                  <p className="text-[11px] font-normal text-gray-600">{moment(item.hr_StartingDate).add(10, 'years').format('DD MMM YYYY')}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
              :
              tabState === 'Reject' ?
                <>
                  <div className="bg-white border shadow-sm rounded-md px-1 py-3">
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-9 px-5 pt-3">
                        <p className="text-sm font-bold text-gray-700">Application</p>
                        <p className="text-xs text-gray-500 inline-flex">total <p className="text-purple-600 font-bold px-1">{filteredData3.length}</p> item</p>
                      </div>

                      <div className="col-span-3">
                        <div className="flex flex-col p-4 rounded-md">
                          <input
                            type="text"
                            placeholder="search"
                            value={searchTerm3}
                            onChange={(e) => setSearchTerm3(e.target.value)}
                            className="bg-gray-100 rounded-lg border-0 focus:ring-purple-600 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-12">
                        {filteredData3?.map((item: any) => (
                          <div key={item.recruitmentID}>
                            <div className="grid grid-cols-12 gap-2 transition ease-out hover:-translate-x-1 hover:bg-white hover:border hover:rounded-md hover:scale-105 duration-300">
                              <div className="col-span-4">
                                <div className="flex items-center pl-5 py-4 text-gray-900 dark:text-white">
                                  <Image style={{ borderRadius: 100, width: 80, height: 80, objectFit: 'cover' }} src={item.imageBase64} alt="Jese image" width={80} height={80} />
                                  <div className="ps-3 break-words">
                                    <div className="text-[15px] font-semibold">{item.positionDesired}</div>
                                    <div className="text-xs font-semibold">{item.firstnameeng} {item.lastnameeng}</div>

                                    <div className="text-[11px] font-bold mt-2 mb-[1px] text-purple-700">Expected Salary</div>
                                    <div className="text-[11px] font-normal">
                                      {Intl.NumberFormat('th-TH', {
                                        style: 'currency',
                                        currency: 'THB',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                      }).format(item.expectedSalary)} THB</div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-3">
                                <div className="items-center px-1 py-4 text-gray-900 dark:text-white">
                                  <div className="text-[11px] font-bold mb-[1px] text-purple-700">Education</div>
                                  <div className="text-[11px] font-normal">{item.rmsEducation?.map((item1: any) => (
                                    <div key={item1.recruitmentID} className="break-words">
                                      {
                                        item1.education === 'Bachelor’s / ปริญญาตรี' ?
                                          <>
                                            {item1.education}<br></br>
                                            {item1.major}<br></br>
                                            {item1.institute}
                                          </>
                                          :
                                          <></>
                                      }
                                    </div>
                                  ))}
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-2">
                                <div className="flex items-center px-1 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                  <div className="ps-3">
                                    <div className="text-[11px] font-bold mb-[1px] text-purple-700">Applicant Date</div>
                                    <div className="text-[11px] font-normal mb-4">{moment(item.registrationDate).format('DD MMM YYYY')}</div>

                                    <div className="text-[11px] font-bold mb-[1px] text-purple-700">Starting Date</div>
                                    <div className="text-[11px] font-normal">{moment(item.startingDate).format('DD MMM YYYY')}</div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-1">
                                <div className="flex items-center px-1 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                  <div className="">
                                    <div className="mt-4">
                                      <Link href="" className="inline-flex bg-amber-100 hover:bg-amber-200 font-medium px-3 py-3 rounded-md text-xs text-center cursor-pointer text-amber-800" as={`/main/application_form/${item.recruitmentID}`}><LuFileEdit className="inline-flex w-4 h-4 text-amber-800 mr-2" /> View</Link>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-2">
                                <div className="flex items-center pr-6 text-gray-900 whitespace-nowrap dark:text-white">
                                  <div className="ps-3">
                                    <span className="relative inline-flex h-3 w-3 mt-9">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                  </div>
                                  <div className="ps-3">
                                    <p className="text-[11px] font-bold mt-9 text-red-600">Delete on date</p>
                                    <p className="text-[11px] font-normal text-gray-600">{moment(item.hr_SubmitStatus_Date).add(60, 'days').format('DD MMM YYYY')}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
                :
                <></>
        }
      </div>
    </>
  );
};

export default MainBody;

