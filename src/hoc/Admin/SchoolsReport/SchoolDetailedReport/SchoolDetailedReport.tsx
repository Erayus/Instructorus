import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import FeedbackStore from '../../../../stores/feedbackStore';
import { observer } from 'mobx-react-lite';
import { IFeedback } from '../../../../models/feedback';

interface DetailParams {
    schoolId: string
}

const SchoolDetailedReport: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const feedbackStore = useContext(FeedbackStore);
    const [feedbackForSchool, setFeedbackForSchool] = useState<IFeedback[]>();

    useEffect(() => {
        // feedbackStore.loadFeedback();
        setFeedbackForSchool(feedbackStore.getFeedbackBySchoolId(match.params.schoolId)); 
    },[feedbackStore, feedbackStore.feedback.length, match.params.schoolId])



    return (
        <div>
         
        </div>
    )
}

export default observer(SchoolDetailedReport)
