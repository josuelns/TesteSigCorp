import { Link, Typography } from '@mui/material'
import React from 'react'

export const Footer: React.FC = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        www.linkedin.com/in/josue-leandro-navarro/
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
