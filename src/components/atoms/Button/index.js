import React from 'react'

function Buttom({onClick, title, loading}) {
    if (loading) {
        return <button disabled className="btn disable" >Loading...</button>
    }else{
        return <button className="btn" onClick={onClick}>{title}</button>

    }

    
}

export default Buttom
