let posts = []

exports.handler = async event => {
	const { body } = event
	
	if(body) {
		posts.push(JSON.parse(body))
	
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: "done",
			result: posts
		})
	}
	} 

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: "Empty !"
		})
	}
}
