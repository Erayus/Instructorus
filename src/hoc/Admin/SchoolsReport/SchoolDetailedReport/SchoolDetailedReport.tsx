import React, { useContext, useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../../stores/rootStore';
import { MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import DoughNutChart from '../../../../components/DoughNutChart/DoughnutChart';
import { ISchool } from '../../../../models/school';

interface DetailParams {
    schoolId: string
}


const SchoolDetailedReport: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {feedback, getFeedbackForReport } = rootStore.feedbackStore;
    const {schools} = rootStore.schoolStore;
    const {questions} = rootStore.questionStore;
    const [yesnoReportDataArray, setYesnoReportDataArray] = useState<any[]>([]);
    const [curSchool, setCurrentSchool] = useState<ISchool>()


    
    const generateReport = useCallback((type: string) => {
        switch (type) {
            case "yesno":
                let resultArray: any[] = [];
                questions.forEach(question => {
                    let feedbackData = getFeedbackForReport(curSchool!.id, question.id, type );
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
    }, [questions, curSchool, getFeedbackForReport])

    useEffect(() => {
        setCurrentSchool(schools.filter(school => school.id === match.params.schoolId)[0]);
        
        if (questions.length > 0 && feedback.length > 0 && curSchool) {
            generateReport("yesno");
        }

    },[rootStore, feedback.length, match.params.schoolId, schools, questions, curSchool, generateReport])

 

    const goBackHandle = () => {
        history.goBack();
    }

    return (
        <div className="px-2 mt-5 ">

            <MDBBtn onClick={goBackHandle}> 
                <MDBIcon icon="arrow-left mr-1" />
                Back
            </MDBBtn>

            <div className="mb-5">
                <h1 className="text-center bolder">{curSchool?.name}</h1>
            </div>
            
            <MDBRow>
                { yesnoReportDataArray.length > 0 && yesnoReportDataArray.map(reportData => {
                    return (
                    <MDBCol md="6" lg="4" key={reportData.title} >
                         <div className="rounded z-depth-1 p-3 my-3">
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
