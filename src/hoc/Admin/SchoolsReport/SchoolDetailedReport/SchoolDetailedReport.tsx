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
    const {getFeedbackBySchoolId, feedback} = rootStore.feedbackStore;
    const {schools} = rootStore.schoolStore;
    const [feedbackForSchool, setFeedbackForSchool] = useState<IFeedback[]>();
    const [curSchool, setCurrentSchool] = useState<ISchool>()

    useEffect(() => {
        // feedbackStore.loadFeedback();
        setFeedbackForSchool(getFeedbackBySchoolId(match.params.schoolId)); 
        setCurrentSchool(schools.filter(school => school.id === match.params.schoolId)[0])
    },[rootStore, feedback.length, match.params.schoolId])



    return (
        <div className="px-2 mt-5 ">
                <div className="mb-5">
                    <h1 className="text-center">{curSchool?.name}</h1>
                </div>
            
            <MDBRow >
                <MDBCol md="4" >
                    <div className="rounded z-depth-1 p-3">
                        <DoughNutChart title="Did you have fun today?" noOfYes="70" noOfNo="30" />
                    </div>
                </MDBCol>
                <MDBCol md="4"  >
                    <div className="rounded z-depth-1 p-3 ">
                        <DoughNutChart title="Did you have fun today?" noOfYes="70" noOfNo="30" />
                    </div>
                </MDBCol>
                <MDBCol md="4"  >
                    <div className="rounded z-depth-1 p-3 ">
                        <DoughNutChart title="Did you have fun today?" noOfYes="70" noOfNo="30" />
                    </div>
                </MDBCol>
            </MDBRow>
        </div>
    )
}

export default observer(SchoolDetailedReport)
