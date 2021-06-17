export default function getSubmitURL(controller, action) {
	switch (action.toLowerCase()) {
		 case "psot":
            return handleServerCommunication_type1(url, action, content);
        case "get":
            return handleServerCommunication_type2(url, action, content);
        case "put":
            return handleServerCommunication_type2(url, action, content);
        default: 
	} 
}