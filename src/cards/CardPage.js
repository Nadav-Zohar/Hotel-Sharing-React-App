import React from 'react'
import { useParams } from 'react-router-dom';
export default function CardPage() {
    const { cardID } = useParams();
    return (
        <div>CardPage</div>
    )
}
