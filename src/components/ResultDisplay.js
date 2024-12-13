import React from 'react'

const ResultDisplay = ({ result }) => {
	if (!result) return null

	return (
		<div>
			{result.status === 'success' ? (
				<pre>{result.output}</pre>
			) : (
				<pre style={{ color: 'red' }}>{result.error}</pre>
			)}
		</div>
	)
}

export default ResultDisplay
