import React from 'react'
import {Box , TextField , Button , styled , Typography} from '@mui/material';
import { useState,useContext } from 'react';
import {API} from '../../services/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';
const Component = styled(Box)`
width : 400px;
margin : auto;
box-shadow : 5px 2px 5px 2px rgba(0 0 0/0.6);
`
const Image = styled('img')({
    width : 100,
    margin : 'auto',
    display : 'flex',
    padding : '50px 0 0'
})

const Wrapper = styled(Box)`
padding : 25px 35px;
display : flex;
flex-direction : column;
flex : 1;
& > div , & > button , & > p {
    margin-top : 20px;
}
`

const LoginButton = styled(Button)`
text-transform : none;
background : #FB641B;
color : #fff;
height : 48px;
border-radius : 2px;
`

const SignupButton = styled(Button)`
text-transform : none;
background : #fff;
color : #2874f0;
height : 48px;
border-radius : 2px;
box-shadow : 0 2px 4px 0 rgb(0 0 0 / 20%);
`

const Text = styled(Typography)`
font-size : 16px;
color : #878787;
`

const Error = styled(Typography)`
font-size : 10px;
line-height : 0;
margin-top : 10px;
font-weight : 600;
color : #ff6161;
`

const signupInitialvalues = {
    name : '',
    username : '',
    password : '',
}
 const Login = ({isUserAuthenticated}) =>{
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

     const [account , setAccount] = useState('login');
     const[signUp , setSignup] = useState(signupInitialvalues);
     const[error , setError] = useState('');

   
     const togglebtn = function(){
      account == 'signup' ? setAccount('login') :   setAccount('signup');
     }

     const onInputchange = (e) =>{
        setSignup({...signUp , [e.target.name] : e.target.value})
     } 

     const signupUser = async() =>{
      let response = await API.userSignup(signUp);
      if(response.isSuccess) {
        setError('');
        setSignup(signupInitialvalues);
        setAccount('login');

      } else {
        setError('Something went wrong ! Please try again')
      }
     }

     //login implementation  fn
     const [login,setlogin]=useState({
        username : '',
        password : '',
     });
     const onValueChnage=(e)=>{
        setlogin({...login, [e.target.name] : e.target.value});


     }

     const {setAccountContext} = useContext(DataContext)//storing usernam and name in contextApi to make available globaly we have used ContextApi

     const navigate=useNavigate();

     const loginUser = async() =>{
        let response=await API.userLogin(login)
        if(response.isSuccess) {
            setError('');
            sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
            setAccountContext({username: response.data.username, name:response.data.name})
          
            isUserAuthenticated(true);
            navigate('/');
          
          
          } else {
            setError('Something went wrong ! Please try again')
          }
     }


    return(
        <Component>
            <Box>
            <Image src = {imageURL} alt = "loginImg" />
            {
            account === 'login' ? 
            <Wrapper>
            <TextField  variant="standard" value={login.username} onChange={onValueChnage} name="username" label = "Enter Username"/>
            <TextField  variant="standard" value={login.password} onChange={onValueChnage} name="password" label = "Enter Password"/>
            
            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={loginUser} >Login</LoginButton>
            <Text style={{textAlign : "center"}}>OR</Text>
            <SignupButton onClick={togglebtn}>Create an account</SignupButton>
            </Wrapper>
:
            <Wrapper>
            <TextField  variant="standard" label = "Enter Name" onChange={onInputchange} name = 'name'/>
            <TextField  variant="standard" label = "Enter Username" onChange={onInputchange} name = 'username'/>
            <TextField  variant="standard" label = "Enter Password" onChange={onInputchange} name = 'password'/>

             {error && <Error>{error}</Error>}
            <SignupButton onClick={signupUser}>SignUp</SignupButton>
            <Text style={{textAlign : "center"}}>OR</Text>
            <LoginButton variant="contained" onClick={togglebtn}>Already have an account?</LoginButton>
            </Wrapper>
            }
            </Box>
        </Component>
    )
 }

 export default Login;