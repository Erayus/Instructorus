import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { IFeedback } from '../../../../models/feedback';
import { RootStoreContext } from '../../../../stores/rootStore';

interface DetailParams {
    schoolId: string
}

const SchoolDetailedReport: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {getFeedbackBySchoolId, feedback} = rootStore.feedbackStore;
    const [feedbackForSchool, setFeedbackForSchool] = useState<IFeedback[]>();

    useEffect(() => {
        // feedbackStore.loadFeedback();
        setFeedbackForSchool(getFeedbackBySchoolId(match.params.schoolId)); 
    },[rootStore, feedback.length, match.params.schoolId])



    return (
        <div>
         
        </div>
    )
}

export default observer(SchoolDetailedReport)
