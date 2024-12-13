import React, { useState } from 'react'
import MonacoEditor from 'react-monaco-editor'

const CodeEditor = ({ onRunCode }) => {
	const [code, setCode] = useState('')
	const [language, setLanguage] = useState('python')

	const handleRun = () => {
		onRunCode(code, language)
	}

	return (
		<div>
			<select onChange={e => setLanguage(e.target.value)} value={language}>
				<option value='python'>Python</option>
				<option value='go'>Go</option>
			</select>
			<MonacoEditor
				language={language}
				value={code}
				onChange={setCode}
				options={{ selectOnLineNumbers: true }}
				height='400px'
			/>
			<button onClick={handleRun}>Run</button>
		</div>
	)
}

export default CodeEditor
