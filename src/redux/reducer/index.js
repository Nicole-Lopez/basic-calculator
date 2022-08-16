const initialState = {
    digits:[],
    operators:[],
    result:null
}

export default function rootReducer (state= initialState, action){
    switch (action.type){
        case 'ADD_DIGIT':
            if (state.digits.length) {
                state.digits.push(action.payload)
                return {
                    ...state
                }      
            }else{
                return {
                    ...state,
                    digits:[action.payload]
                }      
            }

        case 'ADD_OPERATORS':
            if (state.operators.length) {
                state.operators.push(action.payload)
                return {
                    ...state
                }                   
            }else{
                return{
                    ...state,
                    operators: [action.payload]
                }
            }

        case 'GET_RESULT':
            let numbers = state.digits.map(e=>{
                if (e.includes('.')) {
                    return parseFloat(e)
                } else {
                    return parseInt(e)
                }
            })

            for (let i = 0; i < state.operators.length; i++) {
                let a = numbers[0]
                let b = numbers[1]
                
                let res
                
                if (state.operators[i] === '+') res = a + b;
                if (state.operators[i] === '-') res = a - b;
                if (state.operators[i] === '/') res = a / b;
                if (state.operators[i] === '*') res = a * b;
                   
                numbers.shift()
                numbers.shift()
                numbers.unshift(res)
            }

            return {
                ...state,
                result:numbers[0]
            }                   
          
        case 'REMOVE_OPERATOR':
            state.operators.pop()                
            return {
                ...state
            } 
 
        case 'CLEAR':
            return{
                ...state,
                digits:[],
                operators:[],
                result:null
            }
                             
        default :
        return {
            ...state,
        }
    }
}