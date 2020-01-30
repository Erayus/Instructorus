import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { IFeedback } from '../../../../models/feedback';
import { RootStoreContext } from '../../../../stores/rootStore';
import { MDBRow, MDBCol } from 'mdbreact';
import DoughNutChart from '../../../../components/DoughNutChart/DoughnutChart';
import { ISchool } from '../../../../models/school';

interface DetailParams {
    schoolId: string
}

const SchoolDetailedReport: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {feedback, getFeedbackBySchoolId, getFeedbackByQuestionIdAndQuestionId } = rootStore.feedbackStore;
    const {schools} = rootStore.schoolStore;
    const {questions} = rootStore.questionStore;
    const [feedbackForSchool, setFeedbackForSchool] = useState<IFeedback[]>();
    const [curSchool, setCurrentSchool] = useState<ISchool>()

    useEffect(() => {
        setCurrentSchool(schools.filter(school => school.id === match.params.schoolId)[0]);
        
        if (questions.length > 0) {
            generateYesNoReport();
        }

    },[rootStore, feedback.length, match.params.schoolId, schools, questions])

    const generateYesNoReport = () => {
        questions.forEach(question => {
            const feedbackData = getFeedbackByQuestionIdAndQuestionId(curSchool!.id, question.id);
            let numOfYes = 0;
            let numOfNo = 0;
            
            
        })
    }

    // if (questions) {
    // const displayingChartResult =  (
    //     questions.forEach(question =>{
    //         const feedbackData = getFeedbackByQuestionIdAndQuestionId(curSchool!.id, question.id);
    //         let numOfYes = 0;
    //         let numOfNo = 0;

    //         feedbackData!.forEach((eachFeedback: IFeedback) => {
    //             if (eachFeedback.response === "yes"){
    //                 numOfYes += 1;
    //             }
    //         })
    //         return (
    //                 <MDBCol md="4" >
    //                     <div className="rounded z-depth-1 p-3">
    //                         <DoughNutChart title={question.content} noOfYes="80" noOfNo="20" />
    //                     </div>
    //                 </MDBCol>
    //             )
    //         })
    //     )
    // }


    return (
        <div className="px-2 mt-5 ">
                <div className="mb-5">
                    <h1 className="text-center">{curSchool?.name}</h1>
                </div>
            
            <MDBRow>
             
            </MDBRow>
        </div>
    )
}

export default observer(SchoolDetailedReport)
