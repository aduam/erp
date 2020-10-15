import styled, { keyframes } from 'styled-components';

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

const Animation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;

  div {
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #8e24aa;
    animation: ${Animation} 1.2s linear infinite;
  }
  div:nth-child(1) {
    top: 6px;
    left: 6px;
    animation-delay: 0s;
  }
  div:nth-child(2) {
    top: 6px;
    left: 26px;
    animation-delay: -0.4s;
  }
  div:nth-child(3) {
    top: 6px;
    left: 45px;
    animation-delay: -0.8s;
  }
  div:nth-child(4) {
    top: 26px;
    left: 6px;
    animation-delay: -0.4s;
  }
  div:nth-child(5) {
    top: 26px;
    left: 26px;
    animation-delay: -0.8s;
  }
  div:nth-child(6) {
    top: 26px;
    left: 45px;
    animation-delay: -1.2s;
  }
  div:nth-child(7) {
    top: 45px;
    left: 6px;
    animation-delay: -0.8s;
  }
  div:nth-child(8) {
    top: 45px;
    left: 26px;
    animation-delay: -1.2s;
  }
  div:nth-child(9) {
    top: 45px;
    left: 45px;
    animation-delay: -1.6s;
  }
`

export const Loading = () => (
  <Loader>
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
    <div></div><div></div><div></div>
  </Loader>
)