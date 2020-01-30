import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { IFeedback } from '../../../../models/feedback';
import { RootStoreContext } from '../../../../stores/rootStore';
import { MDBRow, MDBCol } from 'mdbreact';
import DoughNutChart from '../../../../components/DoughNutChart/DoughnutChart';
import { ISchool } from '../../../../models/school';
import { toJS } from "mobx";

interface DetailParams {
    schoolId: string
}

const SchoolDetailedReport: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {feedback, getFeedbackBySchoolId, getFeedbackBySchoolIdAndQuestionId } = rootStore.feedbackStore;
    const {schools} = rootStore.schoolStore;
    const {questions} = rootStore.questionStore;
    const [yesnoReportDataArray, setYesnoReportDataArray] = useState<any[]>([]);
    const [curSchool, setCurrentSchool] = useState<ISchool>()

    useEffect(() => {
        setCurrentSchool(schools.filter(school => school.id === match.params.schoolId)[0]);
        
        if (questions.length > 0 && feedback.length > 0 && curSchool) {
            generateYesNoReport();
        }

    },[rootStore, feedback.length, match.params.schoolId, schools, questions, curSchool])

    const generateYesNoReport = () => {
        let resultArray: any[] = [];

        questions.forEach(question => {
            let feedbackData = getFeedbackBySchoolIdAndQuestionId(curSchool!.id, question.id);
            let noOfYes = 0;
            let noOfNo = 0;
            for (let eachFeedback of feedbackData! ) {
                eachFeedback.response === "Yes" ?  noOfYes++ : noOfNo++;
            }
            let reportData = {
                title: question.content,
                noOfYes: noOfYes,
                noOfNo: noOfNo
            }
            resultArray.push(reportData);
        })

        setYesnoReportDataArray(resultArray);

    }

    return (
        <div className="px-2 mt-5 ">
                <div className="mb-5">
                    <h1 className="text-center">{curSchool?.name}</h1>
                </div>
            
            <MDBRow>
                {yesnoReportDataArray.map(reportData => {
                    return (
                    <MDBCol md="4" key={reportData.title} >
                         <div className="rounded z-depth-1 p-3">
                             <DoughNutChart title={reportData.title} noOfYes={reportData.noOfYes} noOfNo={reportData.noOfNo} />
                         </div>
                     </MDBCol>
                    )
                })}
             
            </MDBRow>
        </div>
    )
}

export default observer(SchoolDetailedReport)
