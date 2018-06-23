import React from "react";
import { Link } from 'react-router-dom';

const JournalCard = props => {
    const { title, slug } = props;
    return(
        <div>
            <Link to={`/${slug}`}>{title}</Link>
        </div>
    )
}

export default JournalCard;