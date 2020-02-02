import React from 'react';
import Rating, { RatingProps } from '@bit/semantic-org.semantic-ui-react.rating';

const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

interface IProps {
    sizeInPixel: string,
    onRated: (response: string |number | undefined) => void 
}

const RatingScale: React.FC<IProps> = ({sizeInPixel, onRated}) => {

    const rateHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: RatingProps) => {
        onRated(data.rating);
    }
    return (
        <div>
            {style}
            <Rating 
                style={{fontSize: sizeInPixel}} 
                icon='star'  
                defaultRating={0} 
                maxRating={5}  
                onRate={rateHandler}/>
        </div>
    )
}

export default RatingScale;