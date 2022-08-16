export function addDigits (payload) {
    return({        
        type: 'ADD_DIGIT',
        payload
    })
}

export function addOperators (payload) {
    return({        
        type: 'ADD_OPERATORS',
        payload
    })
}

export function getResult () {
    return({        
        type: 'GET_RESULT'
    })
}

export function removeOperator (payload) {
    return({        
        type: 'REMOVE_OPERATOR',
        payload
    })
}

export function clear () {
    return({        
        type: 'CLEAR'
    })
}