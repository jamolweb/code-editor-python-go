import { Editor } from '@monaco-editor/react'
import { createServer } from 'miragejs'
import React, { useState } from 'react'

createServer({
	routes() {
		this.post('/api/execute', (schema, request) => {
			const { language, code } = JSON.parse(request.requestBody)

			if (language === 'python' && code.includes('print')) {
				return { status: 'success', output: 'Hello, world!\n' }
			} else if (language === 'go' && code.includes('fmt.Println')) {
				return { status: 'success', output: 'Hello, world!\n' }
			} else {
				return { status: 'error', error: 'SyntaxError: Invalid code' }
			}
		})
	},
})

const App = () => {
	const [language, setLanguage] = useState('python')
	const [code, setCode] = useState('')
	const [result, setResult] = useState('')

	const handleRun = async () => {
		try {
			const response = await fetch('/api/execute', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ language, code }),
			})

			const data = await response.json()
			if (data.status === 'success') {
				setResult(`Output:\n${data.output}`)
			} else {
				setResult(`Error:\n${data.error}`)
			}
		} catch (error) {
			setResult('Error: Failed to execute the code.')
		}
	}

	return (
		<div style={{ padding: '20px', fontFamily: 'Arial' }}>
			<h1>Online Code Editor</h1>

			{/* Language Selector */}
			<div style={{ marginBottom: '10px' }}>
				<label>
					Select Language:{' '}
					<select value={language} onChange={e => setLanguage(e.target.value)}>
						<option value='python'>Python</option>
						<option value='go'>Go</option>
					</select>
				</label>
			</div>

			<Editor
				height='300px'
				language={language}
				theme='vs-dark'
				value={code}
				onChange={value => setCode(value || '')}
			/>

			<button
				style={{
					marginTop: '10px',
					padding: '10px 20px',
					backgroundColor: '#4CAF50',
					color: 'white',
					border: 'none',
					cursor: 'pointer',
				}}
				onClick={handleRun}
			>
				Run
			</button>

			<pre
				style={{
					marginTop: '20px',
					padding: '10px',
					backgroundColor: '#f4f4f4',
					border: '1px solid #ddd',
					borderRadius: '5px',
					whiteSpace: 'pre-wrap',
				}}
			>
				{result}
			</pre>
		</div>
	)
}

export default App
