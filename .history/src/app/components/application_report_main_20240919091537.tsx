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
                worksheet.getCell('D9').value = moment(data.registrationDate).format("DD MMM yyyy")
                worksheet.getCell('E10').value = data.sourceOfRecruitment
                worksheet.getCell('P10').value = moment(data.startingDate).format("DD MMM yyyy")
                worksheet.getCell('D11').value = data.positionDesired
                worksheet.getCell('P11').value = data.expectedSalary
                const imageId = workbook.addImage({
                    base64: data.imageBase64,
                    extension: 'jpeg',
                });
                worksheet.addImage(imageId, {
                    tl: { col: 20.7, row: 8.13 },
                    ext: { width: 105, height: 140 }
                });

                worksheet.getCell('B15').value = data.prefixth
                worksheet.getCell('G15').value = data.firstnameth + "  " + data.lastnameth
                worksheet.getCell('U15').value = data.nicknameth
                worksheet.getCell('B16').value = data.prefixeng
                worksheet.getCell('G16').value = data.firstnameeng + "  " + data.lastnameeng
                worksheet.getCell('U16').value = data.nicknameeng

                const dateofBirth = data.dateofBirth;
                worksheet.getCell('C17').value = dateofBirth ? moment(data.dateofBirth).format("DD MMM yyyy") : ""
                worksheet.getCell('H17').value = data.age
                worksheet.getCell('M17').value = data.height
                worksheet.getCell('R17').value = data.weight
                worksheet.getCell('V17').value = data.bloodGroup
                worksheet.getCell('B18').value = data.nationality
                worksheet.getCell('N18').value = data.selectIDPP == "ID Card" ? data.idCardno : data.idPassportno
                worksheet.getCell('E19').value = data.permanentAddress
                worksheet.getCell('D20').value = data.presentAddress
                worksheet.getCell('D21').value = data.ownerorRental
                worksheet.getCell('I21').value = data.email
                worksheet.getCell('U21').value = data.homeno
                worksheet.getCell('D22').value = data.militaryStatus
                worksheet.getCell('O22').value = data.mobileno
                worksheet.getCell('B25').value = data.chkcar1 == "Y" ? "Yes" : "No"
                worksheet.getCell('E25').value = data.chkcar2 == "Y" ? "Yes" : "No"
                worksheet.getCell('G25').value = data.chkcar3 == "Y" ? "Yes" : "No"
                worksheet.getCell('J25').value = data.carLicenseno

                const carIssuesDate = data.carIssuesDate;
                const carExpiredDate = data.carExpiredDate;
                worksheet.getCell('Q25').value = carIssuesDate ? moment(data.carIssuesDate).format("DD MMM yyyy") : ""
                worksheet.getCell('U25').value = carExpiredDate ? moment(data.carExpiredDate).format("DD MMM yyyy") : ""
                worksheet.getCell('B26').value = data.chkMotorcycle1 == "Y" ? "Yes" : "No"
                worksheet.getCell('E26').value = data.chkMotorcycle2 == "Y" ? "Yes" : "No"
                worksheet.getCell('G26').value = data.chkMotorcycle3 == "Y" ? "Yes" : "No"
                worksheet.getCell('J26').value = data.motorcycleLicenseno

                const motorcycleIssuesDate = data.motorcycleIssuesDate;
                const motorcycleExpiredDate = data.motorcycleExpiredDate;
                worksheet.getCell('Q26').value = motorcycleIssuesDate ? moment(data.motorcycleIssuesDate).format("DD MMM yyyy") : ""
                worksheet.getCell('U26').value = motorcycleExpiredDate ? moment(data.motorcycleExpiredDate).format("DD MMM yyyy") : ""
                worksheet.getCell('D31').value = data.fatherFirstname + "  " + data.fatherLastname
                worksheet.getCell('O31').value = data.fatherAge
                worksheet.getCell('U31').value = data.fatherOccupation
                worksheet.getCell('D32').value = data.fatherPlaceofWork
                worksheet.getCell('Q32').value = data.fatherMobileno
                worksheet.getCell('V32').value = data.fatherLivingStatus
                worksheet.getCell('D33').value = data.motherFirstname + data.motherLastname
                worksheet.getCell('O33').value = data.motherAge
                worksheet.getCell('U33').value = data.motherOccupation
                worksheet.getCell('D24').value = data.motherPlaceofWork
                worksheet.getCell('Q34').value = data.motherMobileno
                worksheet.getCell('V34').value = data.motherLivingStatus

                for (let i = 0; i < data.rmsSibling.length; i++) {
                    worksheet.getCell('A' + (37 + i)).value = data.rmsSibling[i].firstname + "  " + data.rmsSibling[i].lastname
                    worksheet.getCell('L' + (37 + i)).value = data.rmsSibling[i].age
                    worksheet.getCell('O' + (37 + i)).value = data.rmsSibling[i].gender == "M" ? "Male" : "Female"
                    worksheet.getCell('S' + (37 + i)).value = data.rmsSibling[i].occupation
                }
                worksheet.getCell('C44').value = data.maritalStatus
                worksheet.getCell('L44').value = data.spouseFirstname + "  " + data.spouseLastname
                worksheet.getCell('U44').value = data.spouseAge
                worksheet.getCell('B45').value = data.spouseNationality
                worksheet.getCell('J45').value = data.spouseOccupation
                worksheet.getCell('U45').value = data.spouseMobileno

                worksheet.getCell('C46').value = data.spousePlaceofWork
                worksheet.getCell('U46').value = data.childrenNo

                for (let i = 0; i < data.rmsChildren.length; i++) {
                    worksheet.getCell('A' + (49 + i)).value = data.rmsChildren[i].firstname + "  " + data.rmsChildren[i].lastname
                    worksheet.getCell('L' + (49 + i)).value = data.rmsChildren[i].age
                    worksheet.getCell('O' + (49 + i)).value = data.rmsChildren[i].gender == "M" ? "Male" : "Female"
                    worksheet.getCell('S' + (49 + i)).value = data.rmsChildren[i].occupation
                }

                for (let i = 0; i < data.rmsEducation.length; i++) {
                    worksheet.getCell('A' + (57 + (i * 2))).value = data.rmsEducation[i].education
                    worksheet.getCell('D' + (57 + (i * 2))).value = data.rmsEducation[i].institute
                    worksheet.getCell('L' + (57 + (i * 2))).value = moment(data.rmsEducation[i].eduFrom).format("MMM yyyy")
                    worksheet.getCell('L' + (58 + (i * 2))).value = moment(data.rmsEducation[i].eduTo).format("MMM yyyy")
                    worksheet.getCell('O' + (57 + (i * 2))).value = data.rmsEducation[i].major
                    worksheet.getCell('T' + (57 + (i * 2))).value = data.rmsEducation[i].degreeobtained
                    worksheet.getCell('V' + (57 + (i * 2))).value = data.rmsEducation[i].gpa
                }

                for (let i = 0; i < data.rmsInternship.length; i++) {
                    worksheet.getCell('A' + (67 + i)).value = moment(data.rmsInternship[i].internshipExpFrom).format("MMM yyyy") + " - " + moment(data.rmsInternship[i].internshipExpTo).format("MMM yyyy")
                    worksheet.getCell('E' + (67 + i)).value = data.rmsInternship[i].internshipCompany
                    worksheet.getCell('O' + (67 + i)).value = data.rmsInternship[i].internshipPosition
                    worksheet.getCell('T' + (67 + i)).value = data.rmsInternship[i].internshipTypeofBusiness
                }

                worksheet.getCell('V71').value = data.newGraduate == "Y" ? "Yes" : "No"

                for (let i = 0; i < data.rmsWorkexperience.length; i++) {
                    worksheet.getCell('A' + (75 + (i * 2))).value = moment(data.rmsWorkexperience[i].workExpFrom).format("MMM yyyy")
                    worksheet.getCell('A' + (76 + (i * 2))).value = moment(data.rmsWorkexperience[i].workExpTo).format("MMM yyyy")
                    worksheet.getCell('B' + (75 + (i * 2))).value = data.rmsWorkexperience[i].company
                    worksheet.getCell('G' + (75 + (i * 2))).value = data.rmsWorkexperience[i].typeofBusiness
                    worksheet.getCell('K' + (75 + (i * 2))).value = data.rmsWorkexperience[i].position
                    worksheet.getCell('N' + (75 + (i * 2))).value = data.rmsWorkexperience[i].lastSalary
                    worksheet.getCell('P' + (75 + (i * 2))).value = data.rmsWorkexperience[i].responsibility
                    worksheet.getCell('T' + (75 + (i * 2))).value = data.rmsWorkexperience[i].reasonofLeaving
                    worksheet.getCell('V' + (75 + (i * 2))).value = data.rmsWorkexperience[i].currentlyWorking == "Y" ? "ทำอยู่ที่นี่" : "ไม่ใช่"
                }

                for (let i = 0; i < data.rmsTrainingseminar.length; i++) {
                    worksheet.getCell('A' + (86 + i)).value = moment(data.rmsTrainingseminar[i].trainingYear).format("yyyy")
                    worksheet.getCell('B' + (86 + i)).value = data.rmsTrainingseminar[i].trainingCourse
                    worksheet.getCell('M' + (86 + i)).value = data.rmsTrainingseminar[i].trainingInstitute
                    worksheet.getCell('T' + (86 + i)).value = data.rmsTrainingseminar[i].trainingPeriod
                }

                for (let i = 0; i < data.rmsCertificate.length; i++) {
                    worksheet.getCell('A' + (94 + i)).value = data.rmsCertificate[i].certificate
                    worksheet.getCell('M' + (94 + i)).value = data.rmsCertificate[i].certificateDetail
                }

                worksheet.getCell('A101').value = data.interestsandHobbies
                worksheet.getCell('E107').value = data.listeningTH == "G" ? "Good" : data.listeningTH == "F" ? "Fair" : data.listeningTH == "P" ? "Poor" : "";
                worksheet.getCell('J107').value = data.speakingTH == "G" ? "Good" : data.speakingTH == "F" ? "Fair" : data.speakingTH == "P" ? "Poor" : "";
                worksheet.getCell('P107').value = data.readingTH == "G" ? "Good" : data.readingTH == "F" ? "Fair" : data.readingTH == "P" ? "Poor" : "";
                worksheet.getCell('U107').value = data.writingTH == "G" ? "Good" : data.writingTH == "F" ? "Fair" : data.writingTH == "P" ? "Poor" : "";

                worksheet.getCell('E108').value = data.listeningEN == "G" ? "Good" : data.listeningEN == "F" ? "Fair" : data.listeningEN == "P" ? "Poor" : "";
                worksheet.getCell('J108').value = data.speakingEN == "G" ? "Good" : data.speakingEN == "F" ? "Fair" : data.speakingEN == "P" ? "Poor" : "";
                worksheet.getCell('P108').value = data.readingEN == "G" ? "Good" : data.readingEN == "F" ? "Fair" : data.readingEN == "P" ? "Poor" : "";
                worksheet.getCell('U108').value = data.writingEN == "G" ? "Good" : data.writingEN == "F" ? "Fair" : data.writingEN == "P" ? "Poor" : "";

                worksheet.getCell('A109').value = data.languageOTH
                worksheet.getCell('E109').value = data.listeningOTH == "G" ? "Good" : data.listeningOTH == "F" ? "Fair" : data.listeningOTH == "P" ? "Poor" : "";
                worksheet.getCell('J109').value = data.speakingOTH == "G" ? "Good" : data.speakingOTH == "F" ? "Fair" : data.speakingOTH == "P" ? "Poor" : "";
                worksheet.getCell('P109').value = data.readingOTH == "G" ? "Good" : data.readingOTH == "F" ? "Fair" : data.readingOTH == "P" ? "Poor" : "";
                worksheet.getCell('U109').value = data.writingOTH == "G" ? "Good" : data.writingOTH == "F" ? "Fair" : data.writingOTH == "P" ? "Poor" : "";

                worksheet.getCell('F115').value = data.toeicScore
                worksheet.getCell('U115').value = data.msword == "G" ? "Good" : data.msword == "F" ? "Fair" : data.msword == "P" ? "Poor" : "";
                worksheet.getCell('A116').value = data.otherLanguageTest
                worksheet.getCell('F116').value = data.ieltsScore
                worksheet.getCell('U116').value = data.msexcel == "G" ? "Good" : data.msexcel == "F" ? "Fair" : data.msexcel == "P" ? "Poor" : "";
                worksheet.getCell('U117').value = data.mspowerpoint == "G" ? "Good" : data.mspowerpoint == "F" ? "Fair" : data.mspowerpoint == "P" ? "Poor" : "";

                worksheet.getCell('R120').value = data.workUpcountry == "Y" ? "Yes" : "No"
                worksheet.getCell('R121').value = data.overseastripandTraining == "Y" ? "Yes" : "No"
                worksheet.getCell('R122').value = data.underlyingDisease == "Y" ? "Yes" : "No"
                worksheet.getCell('T122').value = data.underlyingDiseaseDetail
                worksheet.getCell('R123').value = data.physicalDisability == "Y" ? "Yes" : "No"
                worksheet.getCell('T123').value = data.physicalDisabilityDetail
                worksheet.getCell('R124').value = data.lawsuitorConvicted == "Y" ? "Yes" : "No"
                worksheet.getCell('T124').value = data.lawsuitorConvictedDetail
                worksheet.getCell('R125').value = data.sackedFromJob == "Y" ? "Yes" : "No"
                worksheet.getCell('R126').value = data.workingOverTime == "Y" ? "Yes" : "No"
                worksheet.getCell('R127').value = data.usedtoWorkinNEC == "Y" ? "Yes" : "No"
                worksheet.getCell('R128').value = data.foRinNEC == "Y" ? "Yes" : "No"
                worksheet.getCell('T128').value = data.foRinNECname
                worksheet.getCell('T129').value = data.foRinNECposition
                worksheet.getCell('T130').value = data.foRinNECrelationship

                worksheet.getCell('A132').value = data.joinOurCompany

                worksheet.getCell('A140').value = data.firstnameRef + "  " + data.lastnameRef
                worksheet.getCell('F140').value = data.addressRef
                worksheet.getCell('Q140').value = data.telephoneRef
                worksheet.getCell('U140').value = data.occupationRef

                worksheet.getCell('A147').value = data.firstnameEmergency + "  " + data.lastnameEmergency
                worksheet.getCell('F147').value = data.addressEmergency
                worksheet.getCell('Q147').value = data.telnoEmergency
                worksheet.getCell('U147').value = data.relationshipEmergency

                worksheet.getCell('A151').value = data.presentJobOrProject

                worksheet.getCell('M158').value = data.inquiriesFromPreEmp == "Y" ? "Yes" : "No"

                const registrationDate = data.registrationDate;
                worksheet.getCell('T189').value = registrationDate ? moment(data.registrationDate).format("DD MMM yyyy") : ""
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
