export const API_NOTIFICATION_MESSAGES ={
    loading : {
     title : 'Loading....',
     message : 'Data is being loaded'
    } ,

    success : {
        title : 'Success',
        message : 'Data is successfully loaded'
    },
    responseFailure : {
        title : 'Error',
        message : 'An error occurred while fetching response data'
    },
    requestFailure : {
        title : 'Error',
        message : 'An error occurred while parsing request data'
    },
    networkError : {
        title : 'Error',
        message : 'Unable to connect to server. Please try again'
    }
}

export const SERVICE_URLS = {
    userSignup : {url : '/signup' , method : 'POST'},
    userLogin : {url : '/login' , method : 'POST'}
}