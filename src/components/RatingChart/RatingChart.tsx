import React from 'react';
import Rating, { RatingProps } from '@bit/semantic-org.semantic-ui-react.rating';

const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

interface IProps {
    sizeInPixel: string
}

const RatingScale = (props: IProps) => {

    const rateHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: RatingProps) => {
        console.log(data);
    }
    return (
        <div>
            {style}
            <Rating style={{fontSize: props.sizeInPixel}} icon='heart'  defaultRating={1} maxRating={3}  onRate={rateHandler}/>

        </div>
    )
}

export default RatingScale;