import  {React} from 'react'
import {Box,TextField,Button ,styled,Typography} from '@mui/material'
import { margin } from '@mui/system';
import { useState } from 'react'
const Component = styled(Box)`
 width:400px;
 margin:auto;
 box-shadow:5px 2px 5px 2px rgba(0 0 0 /0.6);
`;
const Image= styled('img')({
  width:"30%",
  height:"30%",
  margin:"auto",
  display: "flex",
  padding:"50px 20px",
});

const Wrapper = styled(Box)`
padding-top: 25px 35px;
display :flex;
flex-direction: column;
flex:1;
&> div,&>button,&>p{
    margin-top:20px,
}
`;

const Loginbtn = styled(Button)`
text-transform:none;
background:#FB641B;
color:#fff;
height:48px;
border-radius:2px;
`;
const Signinbtn = styled(Button)`
text-transform:none;
background:#fff;
color:#2874f0;
height:48px;
border-radius:2px;
box-shadow:0 2px 4px 0 rgba(0 0 0 /20%);
`;
 const Text=styled(Typography)`
 font-size:16px;
 color:#878787
 `;

export default function Login() {
    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-UJXkFPrl0zD9gUX1q2fbwJ9xiLL78XkyZQ&usqp=CAU'
  
  const [account, setAccount] =useState('login')
  const toggleSignup=()=>{
    account==='login' ? setAccount("signup") : setAccount("login")
  }
//getting value from signup textfield for storing it in db
const[signup, setSignup] = useState({
  name: "",
  username: "",
  password: "",
})
const onInputChange=(event)=>{
  setSignup({...signup,[event.target.name]:event.target.value})
}

  return (
<Component>
<Box>
<Image src={imageUrl} alt="BlogLog" />


{
  account==='login'? <Wrapper>
<TextField  variant="standard" label="Enter UserName" />
<TextField  variant="standard" label="Enter Password"/>
<Loginbtn variant="contained">Login</Loginbtn>
<Text style={{textAlign:"center"}}>OR</Text>
<Signinbtn onClick={toggleSignup}>Create an account </Signinbtn>
</Wrapper> :
<Wrapper>
<TextField  variant="standard" onChange={onInputChange} name='name' label="Name"/>
<TextField  variant="standard" onChange={onInputChange}  name='username' label="Enter UserName" />
<TextField  variant="standard" onChange={onInputChange} name='password' label="Enter Password"/>
<Signinbtn >Signup</Signinbtn>
<Text style={{textAlign:"center"}}>OR</Text>
<Loginbtn variant="contained" onClick={toggleSignup}>Already have an account </Loginbtn>
</Wrapper>
}
</Box>
</Component>
  )
}
