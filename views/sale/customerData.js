import styled from 'styled-components'
import { useState } from 'react'
import { useApolloClient } from '@apollo/client';
import { TextField, Checkbox, FormControlLabel, Typography } from '@material-ui/core'
import { SEARCH_CUSTOMER } from '../../queries/customer'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  padding: 15px;
`

const WrappData = styled.div`
  margin-top: 15px;
`

const CustomerData = ({ handleExistClient }) => {
  const client = useApolloClient();
  const [state, setState] = useState({
    loading: false,
    error: false,
    data: null
  })
  const [checked, setChecked] = useState(false);

  const handleSearchCustomer = async (e) => {
    const { value } = e.target
    setState({ ...state, loading: true })
    try {
      const { data, loading, error } = await client.query({
        query: SEARCH_CUSTOMER,
        variables: {
          nit: value,
        },
      });
      if (loading) {
        setState({ ...state, loading: true })
      }
      if (error) {
        setState({ ...state, loading: false, error: true })
      }
      setState({ ...state, loading: false, error: false, data })
      handleExistClient({ data: !!data && !!data.searchCustomer && !!data.searchCustomer.id ? data.searchCustomer : null })
    } catch (error) {
      setState({ ...state, loading: false, error: true, data: null })
      handleExistClient({ data: null })
    }
  }

  const handleChange = (event) => {
    if (event.target.checked) {
      handleExistClient({ data: null })
    } else {
      handleExistClient(null)
    }
    setChecked(event.target.checked);
  };

  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <Form onSubmit={onSubmit}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            name="cf"
            color="secondary"
          />
        }
        label="C/F"
      />
      {!checked ? (
        <>
          <TextField
            id="nit"
            name="nit"
            label="Nit"
            onBlur={handleSearchCustomer}
          />
          {state.loading && (
            <WrappData>
              <Typography variant="body1">Buscando...</Typography>
            </WrappData>
          )}
          {state.data && state.data.searchCustomer && state.data.searchCustomer.id && (
            <>
              <WrappData>
                <Typography variant="body1">{`NIT: ${state.data.searchCustomer.nit}`}</Typography>
              </WrappData>
              <WrappData>
                <Typography variant="body1">{`Nombre: ${state.data.searchCustomer.names} ${state.data.searchCustomer.surnames}`}</Typography>
              </WrappData>
              <WrappData>
                <Typography variant="body1">{`Dirección: ${state.data.searchCustomer.address}`}</Typography>
              </WrappData>
            </>
          )}
          {state.error && (
            <WrappData>
              <Typography variant="body1" color="error">Cliente no existe, favor ingresarlo antes</Typography>
            </WrappData>
          )}
        </>
      ) : (
        <Typography variant="body1">Dirección: Ciudad Guatemala</Typography>
      )}
    </Form>
  )
}

export default CustomerData