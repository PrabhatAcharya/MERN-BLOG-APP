import { Button,Table, TableCell, TableRow,TableHead,TableBody,styled } from "@mui/material";
import { categories } from "../../constants/data";
import { Link } from "react-router-dom";
import React from 'react'

const StyledTable=styled(Table)`
border:1px solid rgba(224,224,224,1)
`
const StyledButton=styled(Button)`
margin:20px;
width:85%;
background:#6495ED;
color:#fff;
`



export default function Categories() {
  return (
    <>
        <Link to={'/create'} style={{textDecoration:'none'}}>
        <StyledButton variant="contained">Create Blog</StyledButton>
        </Link>
        <StyledTable>
            <TableHead>
                <TableRow>
                    <TableCell>All Categories</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    categories.map((categories) =>(
                        <TableRow key={categories.id}>
                           <TableCell> {categories.type}</TableCell>
                        </TableRow>
                       
                       
                    ))
                }
            </TableBody>

        </StyledTable>
    </>
  )
}
