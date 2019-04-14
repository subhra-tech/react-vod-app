import React from 'react'

const Arrow = ({ direction, onClick, glyph }) => (
    <div 
        className={`slide-arrow ${direction}`}
        onClick={ onClick }>
        { glyph }
    </div>
)

export default Arrow