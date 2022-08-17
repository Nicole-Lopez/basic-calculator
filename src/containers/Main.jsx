import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Main.scss';
import {
	addDigits,
	addOperators,
	getResult,
	removeOperator,
	clear
} from '../redux/actions/index';
import useKeypress from 'react-use-keypress';


export default function Main() {
  	const dispatch = useDispatch()
  	const result = useSelector((state) => state.result)

  	const [number, setNumber] = useState('')
  	const [preview, setPreview] = useState('')
  	const [currentValue, setCurrentValue] = useState('')
  	const [darkTheme, setDarkTheme] = useState(true)

	const handleClearBtn = () => {	
		dispatch(clear())
		setCurrentValue('')
		setNumber('')
		setPreview('')		
	}

	const formerNumber = (e) => {
		if (number[0]==='0' && e==='0' && number.length<2) {return}
		else if(number.includes('.') && e==='.'){return}
		else if(!number.length && e==='.'){
			setNumber('0.')
			setPreview(preview+'0.')
			setCurrentValue('0.')			
		}else{
			if (result) {
				handleClearBtn()
				setNumber(e)
				setPreview(e)
				setCurrentValue(e)			
			}else{		
				setNumber(number+e)
				setPreview(preview+e)
				setCurrentValue(number+e)
			}
		}			
	}


	const handleNegative = (e) => {
		setCurrentValue(e)
		setNumber(e)
		setPreview(preview+e)
	}

	const handleDelBtn = () => {
		setCurrentValue(currentValue.substring(0, currentValue.length - 1))
		setNumber(number.substring(0, number.length - 1))
		setPreview(preview.substring(0, preview.length - 1))
	}


	const handleOperator = (e) => {
		setCurrentValue(e)
		if (number && number!=='-') dispatch(addDigits(number))
		
		if (e!=='-') {
			if (preview.substr(-1)==='-'||preview.substr(-1)==='+'||preview.substr(-1)==='*'||preview.substr(-1)==='/') {				
				if (preview.slice(-2, -1)==='-'||preview.slice(-2, -1)==='+'||preview.slice(-2, -1)==='*'||preview.slice(-2, -1)==='/') {
					dispatch(removeOperator(e))
				}
				dispatch(removeOperator(e))
			}	
		}

		if (preview.substr(-1)==='+'||preview.substr(-1)==='*'||preview.substr(-1)==='/') {
			setPreview(preview.substring(0, preview.length - 1)+e)
		}else{
			if (result) {
				setPreview(result.toString()+e)
				dispatch(clear())
				dispatch(addDigits(result.toString()))
			}else{
				setPreview(preview+e)
			}
		}

		dispatch(addOperators(e))	
		setNumber('')		
	}

	const handleResult = () => {
		dispatch(addDigits(number))		
		dispatch(getResult())		
		setCurrentValue('')
		setNumber('')
	}


	useKeypress(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'], (event) => {
	    formerNumber(event.key)
	});

	useKeypress(['+', '*', '-', '/'], (event) => {
		if (event.key === '-') {
			if(preview.substr(-1)!=='-'&&preview.substr(-1)!=='+'&&preview.substr(-1)!=='*'&&preview.substr(-1)!=='/'){
				handleOperator('-')
				return
			}else{
				handleNegative('-')
				return
			}
		}
	    handleOperator(event.key)
	});

	useKeypress('Enter', () => {
	    handleResult()
	});

	useKeypress('Backspace', () => {
		if (result||!number||preview.substr(-1)==='+'||preview.substr(-1)==='*'||preview.substr(-1)==='/') return
		handleDelBtn()			
	});

	useKeypress('Delete', () => {
	    handleClearBtn()
	});

	return (
		<div id='calculator' className={darkTheme?'dark_theme':'light_theme'}>
			<div className="container">

				<div className="author">
					<a href="https://github.com/Nicole-Lopez/basic-calculator" target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i> See the code on GitHub</a>
				</div>

				<p id='preview'>{preview}</p>
				<p id="display">{(result)?result:(currentValue)?currentValue:'0'}</p>
				
				<button onClick={()=>handleDelBtn()} className='other_btn' value='delete' id="delete" disabled={result||!number||preview.substr(-1)==='+'||preview.substr(-1)==='*'||preview.substr(-1)==='/'}>DEL</button>
				<button onClick={()=>handleClearBtn()} className='other_btn' id="clear">AC</button>
				<button onClick={()=>setDarkTheme(!darkTheme)} className='other_btn'><i className="bi bi-sun-fill"></i></button>
				<button onClick={e=>handleOperator('+')} className='operator' id="add">+</button>

				<button onClick={e=>formerNumber('1')} className='number' id="one">1</button>
				<button onClick={e=>formerNumber('2')} className='number' id="two">2</button>
				<button onClick={e=>formerNumber('3')} className='number' id="three">3</button>
				<button onClick={(preview.substr(-1)!=='-'&&preview.substr(-1)!=='+'&&preview.substr(-1)!=='*'&&preview.substr(-1)!=='/')?()=>handleOperator('-'):()=>handleNegative('-')} className='operator' id="subtract">-</button>
				
				<button onClick={e=>formerNumber('4')} className='number' id="four">4</button>
				<button onClick={e=>formerNumber('5')} className='number' id="five">5</button>
				<button onClick={e=>formerNumber('6')} className='number' id="six">6</button>
				<button onClick={e=>handleOperator('*')} className='operator' id="multiply">x</button>
				
				<button onClick={e=>formerNumber('7')} className='number' id="seven">7</button>
				<button onClick={e=>formerNumber('8')} className='number' id="eight">8</button>
				<button onClick={e=>formerNumber('9')} className='number' id="nine">9</button>
				<button onClick={e=>handleOperator('/')} className='operator' id="divide">/</button>
				
				<button onClick={e=>formerNumber('0')} className='number' id="zero">0</button>
				<button onClick={e=>formerNumber('.')} className='number' id="decimal">.</button>
				<button onClick={()=>handleResult()} id="equals">=</button>
			</div>

		</div>

	)
}