import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Form = styled.form`
  width: 100%;
  max-width: 800px;
`

export const InnerForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
`

export const WrapInput = styled.div`
  width: 100%;
  max-width: 285px;
  margin-right: 15px;
  margin-bottom: 15px;
`

export const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const LoaderPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ErrorPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const WrapButtonActions = styled.div`
  display: flex;
  button {
    margin-left: 10px;
  }
`