import React, { Fragment, useEffect, useState } from 'react';
import ExcelJS from 'exceljs';
import { SiMicrosoftexcel } from "react-icons/si";
import moment from "moment";

const Report = (props: any) => {
    const { data } = props;

    const downloadReport = async (e: React.FormEvent) => {

        fetch("/RMS-FORMv2.xlsx")
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => {
                // สร้าง Blob จาก buffer ที่อัปเดตแล้ว
                const blob: any = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                // สร้าง workbook ใหม่ของ ExcelJS
                const workbook = new ExcelJS.Workbook();

                // โหลด blob เข้าไปใน workbook
                return workbook.xlsx.load(blob);
            })
            .then(workbook => {
                //ชีตแรก
                const worksheet: any = workbook.getWorksheet(1);
                worksheet.getCell('E8').value = moment(data.registrationDate).format("DD MMM yyyy")
                worksheet.getCell('E9').value = data.sourceOfRecruitment
                worksheet.getCell('O9').value = moment(data.startingDate).format("DD MMM yyyy")
                worksheet.getCell('E10').value = data.positionDesired
                worksheet.getCell('O10').value = data.expectedSalary
                const imageId = workbook.addImage({
                    base64: data.imageBase64,
                    extension: 'jpeg',
                });
                worksheet.addImage(imageId, {
                    tl: { col: 20.7, row: 8.13 },
                    ext: { width: 105, height: 140 }
                });

                worksheet.getCell('B13').value = data.prefixth
                worksheet.getCell('I13').value = data.firstnameth + "  " + data.lastnameth
                worksheet.getCell('U13').value = data.nicknameth
                worksheet.getCell('B14').value = data.prefixeng
                worksheet.getCell('I14').value = data.firstnameeng + "  " + data.lastnameeng
                worksheet.getCell('U14').value = data.nicknameeng

                const dateofBirth = data.dateofBirth;
                worksheet.getCell('C15').value = dateofBirth ? moment(data.dateofBirth).format("DD MMM yyyy") : ""
                worksheet.getCell('H15').value = data.age
                worksheet.getCell('M15').value = data.height
                worksheet.getCell('F15').value = data.weight
                worksheet.getCell('V15').value = data.bloodGroup
                worksheet.getCell('B16').value = data.nationality
                worksheet.getCell('N16').value = data.selectIDPP == "ID Card" ? data.idCardno : data.idPassportno
                worksheet.getCell('E17').value = data.permanentAddress
                worksheet.getCell('D18').value = data.presentAddress
                worksheet.getCell('D19').value = data.ownerorRental
                worksheet.getCell('I19').value = data.email
                worksheet.getCell('U19').value = data.homeno
                worksheet.getCell('D20').value = data.militaryStatus
                worksheet.getCell('O20').value = data.mobileno
                worksheet.getCell('B23').value = data.chkcar1 == "Y" ? "Yes/ได้" : "No/ไม่ได้"
                worksheet.getCell('E23').value = data.chkcar2 == "Y" ? "Yes/มี" : "No/ไม่มี"
                worksheet.getCell('G23').value = data.chkcar3 == "Y" ? "Yes/มี" : "No/ไม่มี"
                worksheet.getCell('J23').value = data.carLicenseno

                const carIssuesDate = data.carIssuesDate;
                const carExpiredDate = data.carExpiredDate;
                worksheet.getCell('Q23').value = carIssuesDate ? moment(data.carIssuesDate).format("DD MMM yyyy") : ""
                worksheet.getCell('U23').value = carExpiredDate ? moment(data.carExpiredDate).format("DD MMM yyyy") : ""
                worksheet.getCell('B24').value = data.chkMotorcycle1 == "Y" ? "Yes/ได้" : "No/ไม่ได้"
                worksheet.getCell('E24').value = data.chkMotorcycle2 == "Y" ? "Yes/มี" : "No/ไม่มี"
                worksheet.getCell('G24').value = data.chkMotorcycle3 == "Y" ? "Yes/มี" : "No/ไม่มี"
                worksheet.getCell('J24').value = data.motorcycleLicenseno

                const motorcycleIssuesDate = data.motorcycleIssuesDate;
                const motorcycleExpiredDate = data.motorcycleExpiredDate;
                worksheet.getCell('Q24').value = motorcycleIssuesDate ? moment(data.motorcycleIssuesDate).format("DD MMM yyyy") : ""
                worksheet.getCell('U24').value = motorcycleExpiredDate ? moment(data.motorcycleExpiredDate).format("DD MMM yyyy") : ""
                worksheet.getCell('E29').value = data.fatherFirstname + "  " + data.fatherLastname
                worksheet.getCell('O29').value = data.fatherAge
                worksheet.getCell('U29').value = data.fatherOccupation
                worksheet.getCell('E30').value = data.fatherPlaceofWork
                worksheet.getCell('Q30').value = data.fatherMobileno
                worksheet.getCell('V30').value = data.fatherLivingStatus == "Alive" ? "มีชีวิต" : "เสียชีวิต"
                worksheet.getCell('E31').value = data.motherFirstname + data.motherLastname
                worksheet.getCell('O31').value = data.motherAge
                worksheet.getCell('U31').value = data.motherOccupation
                worksheet.getCell('E32').value = data.motherPlaceofWork
                worksheet.getCell('Q32').value = data.motherMobileno
                worksheet.getCell('V32').value = data.motherLivingStatus == "Alive" ? "มีชีวิต" : "เสียชีวิต"
                worksheet.getCell('F33').value = data.homeAddress

                for (let i = 0; i < data.rmsSibling.length; i++) {
                    worksheet.getCell('A' + (36 + i)).value = data.rmsSibling[i].firstname + "  " + data.rmsSibling[i].lastname
                    worksheet.getCell('L' + (36 + i)).value = data.rmsSibling[i].age
                    worksheet.getCell('O' + (36 + i)).value = data.rmsSibling[i].gender == "M" ? "Male" : "Female"
                    worksheet.getCell('S' + (36 + i)).value = data.rmsSibling[i].occupation
                }
                worksheet.getCell('C42').value = data.maritalStatus
                worksheet.getCell('L42').value = data.spouseFirstname + "  " + data.spouseLastname
                worksheet.getCell('U42').value = data.spouseAge
                worksheet.getCell('B43').value = data.spouseNationality
                worksheet.getCell('J43').value = data.spouseOccupation
                worksheet.getCell('U43').value = data.spouseMobileno

                worksheet.getCell('C44').value = data.spousePlaceofWork
                worksheet.getCell('U44').value = data.childrenNo

                for (let i = 0; i < data.rmsChildren.length; i++) {
                    worksheet.getCell('A' + (47 + i)).value = data.rmsChildren[i].firstname + "  " + data.rmsChildren[i].lastname
                    worksheet.getCell('L' + (47 + i)).value = data.rmsChildren[i].age
                    worksheet.getCell('O' + (47 + i)).value = data.rmsChildren[i].gender == "M" ? "Male" : "Female"
                    worksheet.getCell('S' + (47 + i)).value = data.rmsChildren[i].occupation
                }

                for (let i = 0; i < data.rmsEducation.length; i++) {
                    worksheet.getCell('A' + (54 + (i * 2))).value = data.rmsEducation[i].education
                    worksheet.getCell('D' + (54 + (i * 2))).value = data.rmsEducation[i].institute
                    worksheet.getCell('L' + (54 + (i * 2))).value = moment(data.rmsEducation[i].eduFrom).format("MMM yyyy")
                    worksheet.getCell('L' + (55 + (i * 2))).value = moment(data.rmsEducation[i].eduTo).format("MMM yyyy")
                    worksheet.getCell('O' + (54 + (i * 2))).value = data.rmsEducation[i].major
                    worksheet.getCell('T' + (54 + (i * 2))).value = data.rmsEducation[i].degreeobtained
                    worksheet.getCell('V' + (54 + (i * 2))).value = data.rmsEducation[i].gpa
                }

                for (let i = 0; i < data.rmsInternship.length; i++) {
                    worksheet.getCell('A' + (68 + i)).value = moment(data.rmsInternship[i].internshipExpFrom).format("MMM yyyy") + " - " + moment(data.rmsInternship[i].internshipExpTo).format("MMM yyyy")
                    worksheet.getCell('E' + (68 + i)).value = data.rmsInternship[i].internshipCompany
                    worksheet.getCell('O' + (68 + i)).value = data.rmsInternship[i].internshipPosition
                    worksheet.getCell('T' + (68 + i)).value = data.rmsInternship[i].internshipTypeofBusiness
                }

                worksheet.getCell('V71').value = data.newGraduate == "Y" ? "Yes" : "No"

                for (let i = 0; i < data.rmsWorkexperience.length; i++) {
                    worksheet.getCell('A' + (70 + (i * 2))).value = moment(data.rmsWorkexperience[i].workExpFrom).format("MMM yyyy")
                    worksheet.getCell('A' + (71 + (i * 2))).value = moment(data.rmsWorkexperience[i].workExpTo).format("MMM yyyy")
                    worksheet.getCell('B' + (70 + (i * 2))).value = data.rmsWorkexperience[i].company
                    worksheet.getCell('G' + (70 + (i * 2))).value = data.rmsWorkexperience[i].typeofBusiness
                    worksheet.getCell('K' + (70 + (i * 2))).value = data.rmsWorkexperience[i].position
                    worksheet.getCell('N' + (70 + (i * 2))).value = data.rmsWorkexperience[i].lastSalary
                    worksheet.getCell('P' + (70 + (i * 2))).value = data.rmsWorkexperience[i].responsibility
                    worksheet.getCell('T' + (70 + (i * 2))).value = data.rmsWorkexperience[i].reasonofLeaving
                    worksheet.getCell('V' + (70 + (i * 2))).value = data.rmsWorkexperience[i].currentlyWorking == "Y" ? "ทำอยู่ที่นี่" : "ไม่ใช่"
                }

                for (let i = 0; i < data.rmsTrainingseminar.length; i++) {
                    worksheet.getCell('A' + (80 + i)).value = moment(data.rmsTrainingseminar[i].trainingYear).format("yyyy")
                    worksheet.getCell('B' + (80 + i)).value = data.rmsTrainingseminar[i].trainingCourse
                    worksheet.getCell('M' + (80 + i)).value = data.rmsTrainingseminar[i].trainingInstitute
                    worksheet.getCell('T' + (80 + i)).value = data.rmsTrainingseminar[i].trainingPeriod
                }

                for (let i = 0; i < data.rmsCertificate.length; i++) {
                    worksheet.getCell('A' + (88 + i)).value = data.rmsCertificate[i].certificate
                    worksheet.getCell('M' + (88 + i)).value = data.rmsCertificate[i].certificateDetail
                }

                worksheet.getCell('A94').value = data.interestsandHobbies
                worksheet.getCell('E99').value = data.listeningTH == "G" ? "Good" : data.listeningTH == "F" ? "Fair" : data.listeningTH == "P" ? "Poor" : "";
                worksheet.getCell('J99').value = data.speakingTH == "G" ? "Good" : data.speakingTH == "F" ? "Fair" : data.speakingTH == "P" ? "Poor" : "";
                worksheet.getCell('P99').value = data.readingTH == "G" ? "Good" : data.readingTH == "F" ? "Fair" : data.readingTH == "P" ? "Poor" : "";
                worksheet.getCell('U99').value = data.writingTH == "G" ? "Good" : data.writingTH == "F" ? "Fair" : data.writingTH == "P" ? "Poor" : "";

                worksheet.getCell('E100').value = data.listeningEN == "G" ? "Good" : data.listeningEN == "F" ? "Fair" : data.listeningEN == "P" ? "Poor" : "";
                worksheet.getCell('J100').value = data.speakingEN == "G" ? "Good" : data.speakingEN == "F" ? "Fair" : data.speakingEN == "P" ? "Poor" : "";
                worksheet.getCell('P100').value = data.readingEN == "G" ? "Good" : data.readingEN == "F" ? "Fair" : data.readingEN == "P" ? "Poor" : "";
                worksheet.getCell('U100').value = data.writingEN == "G" ? "Good" : data.writingEN == "F" ? "Fair" : data.writingEN == "P" ? "Poor" : "";

                worksheet.getCell('A101').value = data.languageOTH
                worksheet.getCell('E101').value = data.listeningOTH == "G" ? "Good" : data.listeningOTH == "F" ? "Fair" : data.listeningOTH == "P" ? "Poor" : "";
                worksheet.getCell('J101').value = data.speakingOTH == "G" ? "Good" : data.speakingOTH == "F" ? "Fair" : data.speakingOTH == "P" ? "Poor" : "";
                worksheet.getCell('P101').value = data.readingOTH == "G" ? "Good" : data.readingOTH == "F" ? "Fair" : data.readingOTH == "P" ? "Poor" : "";
                worksheet.getCell('U101').value = data.writingOTH == "G" ? "Good" : data.writingOTH == "F" ? "Fair" : data.writingOTH == "P" ? "Poor" : "";

                worksheet.getCell('F107').value = data.toeicScore
                worksheet.getCell('U107').value = data.msword == "G" ? "Advanced/ขั้นสูง" : data.msword == "F" ? "Intermediate/ระดับกลาง" : data.msword == "P" ? "Basic/พื้นฐาน" : "";
                worksheet.getCell('A108').value = data.otherLanguageTest
                worksheet.getCell('F108').value = data.ieltsScore
                worksheet.getCell('U108').value = data.msexcel == "G" ? "Advanced/ขั้นสูง" : data.msword == "F" ? "Intermediate/ระดับกลาง" : data.msword == "P" ? "Basic/พื้นฐาน" : "";
                worksheet.getCell('U109').value = data.mspowerpoint == "G" ? "Advanced/ขั้นสูง" : data.msword == "F" ? "Intermediate/ระดับกลาง" : data.msword == "P" ? "Basic/พื้นฐาน" : "";

                worksheet.getCell('R114').value = data.workUpcountry == "Y" ? "Yes" : "No"
                worksheet.getCell('R115').value = data.overseastripandTraining == "Y" ? "Yes" : "No"
                worksheet.getCell('R116').value = data.underlyingDisease == "Y" ? "Yes" : "No"
                worksheet.getCell('T116').value = data.underlyingDiseaseDetail
                worksheet.getCell('R117').value = data.physicalDisability == "Y" ? "Yes" : "No"
                worksheet.getCell('T117').value = data.physicalDisabilityDetail
                worksheet.getCell('R118').value = data.lawsuitorConvicted == "Y" ? "Yes" : "No"
                worksheet.getCell('T118').value = data.lawsuitorConvictedDetail
                worksheet.getCell('R119').value = data.sackedFromJob == "Y" ? "Yes" : "No"
                worksheet.getCell('R120').value = data.workingOverTime == "Y" ? "Yes" : "No"
                worksheet.getCell('R121').value = data.usedtoWorkinNEC == "Y" ? "Yes" : "No"
                worksheet.getCell('R122').value = data.foRinNEC == "Y" ? "Yes" : "No"
                worksheet.getCell('T122').value = "ชื่อ-สกุล: " + data.foRinNECname
                worksheet.getCell('T123').value = "ตำแหน่ง: " + data.foRinNECposition
                worksheet.getCell('T124').value = "ความสัมพันธ์: " + data.foRinNECrelationship

                worksheet.getCell('A127').value = data.joinOurCompany

                worksheet.getCell('A134').value = data.firstnameRef + "  " + data.lastnameRef
                worksheet.getCell('F134').value = data.addressRef
                worksheet.getCell('Q134').value = data.telephoneRef
                worksheet.getCell('U141').value = data.occupationRef

                worksheet.getCell('A148').value = data.firstnameEmergency + "  " + data.lastnameEmergency
                worksheet.getCell('F148').value = data.addressEmergency
                worksheet.getCell('Q148').value = data.telnoEmergency
                worksheet.getCell('U148').value = data.relationshipEmergency

                worksheet.getCell('A152').value = data.presentJobOrProject

                worksheet.getCell('M159').value = data.inquiriesFromPreEmp == "Y" ? "Yes" : "No"

                const registrationDate = data.registrationDate;
                worksheet.getCell('T190').value = registrationDate ? moment(data.registrationDate).format("DD MMM yyyy") : ""
                // กำหนดค่าของเซลล์

                // แปลง workbook กลับเป็น blob
                return workbook.xlsx.writeBuffer();
            })
            .then(buffer => {
                // สร้าง Blob จาก buffer ที่อัปเดตแล้ว
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                // สร้างลิงก์ดาวน์โหลด
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'Application_' + data.firstnameth + '.xlsx';

                // เพิ่มลิงก์ไปยัง body และคลิกโดยโปรแกรม
                document.body.appendChild(link);
                link.click();

                // ลบลิงก์ออกจาก body
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('เกิดข้อผิดพลาด:', error);
            });

    }

    return (
        <>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <a onClick={(e) => downloadReport(e)} className="inline-flex text-purple-800 bg-purple-200 hover:bg-purple-300 font-medium px-3 py-3 rounded-md text-xs text-center cursor-pointer">
                <SiMicrosoftexcel className="inline-flex w-4 h-4 text-purple-800 mr-2" /> Application Form
            </a>
        </>
    );
};

export default Report;
