import React from 'react'
import styled from 'styled-components'
import SignupForm from '../../components/Signup/SignupForm'

const MainWrapper = styled.section`
  width:100%;
`

const SingupPage = () => {
  return (
    <MainWrapper>
      <SignupForm />
    </MainWrapper>
  )
}

export default SingupPage