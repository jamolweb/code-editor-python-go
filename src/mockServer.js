export const mockServer = (code, language) => {
	return new Promise(resolve => {
		setTimeout(() => {
			if (code.includes('error')) {
				resolve({
					status: 'error',
					error: 'SyntaxError: Unexpected token',
				})
			} else {
				resolve({
					status: 'success',
					output: `Executed ${language} code: ${code}`,
				})
			}
		}, 1000)
	})
}
