import React, { useContext, useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../../stores/rootStore';
import { MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import DoughNutChart from '../../../../components/DoughNutChart/DoughnutChart';
import { ISchool } from '../../../../models/school';

import RatingScale from '../../../../components/RatingScale/RatingScale';

interface DetailParams {
    schoolId: string
}


const SchoolDetailedReport: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {feedback, getFeedbackForReport } = rootStore.feedbackStore;
    const {schools} = rootStore.schoolStore;
    const {questions} = rootStore.questionStore;
    const [yesnoDataArray, setYesnoDataArray] = useState<any[]>([]);
    const [averageRatingDataArray, setAverageRatingDataArray] = useState<any[]>([]);
    const [curSchool, setCurrentSchool] = useState<ISchool>()


    
    const generateReport = useCallback((type: string) => {
        switch (type) {
            case "yesno":

                if (yesnoDataArray.length > 0) {
                    setYesnoDataArray([]);
                };


                let yesNoQuestions = questions.filter(q => q.type === "yesno");
                yesNoQuestions.forEach(question => {
                    let feedbackData = getFeedbackForReport(curSchool!.id, question.id, "yesno" );
                    let noOfYes = 0;
                    let noOfNo = 0;
                    for (let eachFeedback of feedbackData! ) {
                        eachFeedback.response === "Yes" ?  noOfYes++ : noOfNo++;
                    }
                    let yesnoData = {
                        title: question.content,
                        percentOfYes: Math.ceil((noOfYes/(noOfYes + noOfNo))*100),
                        percentOfNo: Math.ceil((noOfNo/(noOfYes + noOfNo))*100)
                    }
                    setYesnoDataArray(prevYesNoArray => {
                        return [...prevYesNoArray, yesnoData]
                    });
                })
                break;
            case "rating":
                if (averageRatingDataArray.length > 0) {
                    setAverageRatingDataArray([])
                };

                let ratingQuestions = questions.filter(q => q.type === "rating");
                ratingQuestions.forEach(question => {
                    let ratingFeedback = getFeedbackForReport(curSchool!.id, question.id, "rating" );
                    const sumRating = ratingFeedback?.map((feedback) => feedback.response).reduce((prevRating: any, curRating: any) => {
                        return prevRating! + curRating!;
                    }, 0);
                    const averageRating = Math.round(sumRating / (ratingFeedback!.length));
                    const ratingData = {
                        title: question.content,
                        value: averageRating
                    }
                    setAverageRatingDataArray(prevRatingDataArray => {
                        return [...prevRatingDataArray, ratingData];
                    })
                });
                break;
                
        }
    }, [feedback, getFeedbackForReport, curSchool])

    useEffect(() => {
        setCurrentSchool(schools.filter(school => school.id === match.params.schoolId)[0]);
        
        if (questions.length > 0 && feedback.length > 0 && curSchool) {
            generateReport("yesno");
            generateReport("rating");
        }

    },[rootStore, feedback, schools, curSchool, questions, match.params.schoolId])

 

    const goBackHandle = () => {
        history.goBack();
    }

    return (
        <div className="px-2 mt-2 ">

            <MDBBtn onClick={goBackHandle}> 
                <MDBIcon icon="arrow-left mr-1" />
                Back
            </MDBBtn>

            <div className="mb-5 m-3">
                <h1 className="text-center bolder">{curSchool?.name}</h1>
            </div>
            
            <MDBRow>
                { yesnoDataArray.length > 0 && yesnoDataArray.map(yesnoData => {
                    return (
                    <MDBCol md="6" lg="4" key={yesnoData.title} >
                         <div className="rounded z-depth-1 p-3 my-3">
                             <DoughNutChart 
                                title={yesnoData.title}
                                labels={["Yes(%)", "No(%)"]}
                                chartData={[yesnoData.percentOfYes, yesnoData.percentOfNo]}
                                backgroundColor={['#00C851', '#e53935']}
                                hoverBackgroundColor={['#1b5e20', '#b71c1c']}
                                />
                         </div>
                     </MDBCol>
                    )
                })}
            </MDBRow>
                <hr/>
            <MDBRow>
                { averageRatingDataArray.length > 0 && averageRatingDataArray.map(ratingData => {
                    return (
                    <MDBCol md="6" lg="4" key={ratingData.title} >
                         <div className="rounded z-depth-1 p-3 my-3 text-center">
                             <h4>{ratingData.title}</h4>
                             <RatingScale
                                sizeInPixel="24px"
                                onRated={()=> {}}
                                ratingValue={ratingData.value}
                                isReadOnly={true}
                            />
                         </div>
                     </MDBCol>
                    )
                })}
            </MDBRow>
        </div>
    )
}

export default observer(SchoolDetailedReport)
