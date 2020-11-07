import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Router from 'next/router'
import { Typography, Button, TextField, FormControl, InputLabel, Select } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { Container, Form, InnerForm, WrapInput } from '../../components'
import { COLLABORATOR_CREATE } from '../../mutations/collaborator'
import { graphError } from '../../lib/graphError'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const CreateProviderView = ({ me }) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const [state, setState] = useState({
    role: '',
  })

  const [createCollaborator, { loading }] = useMutation(COLLABORATOR_CREATE, {
    onCompleted: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha creado el colaborador! redireccionando...',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        Router.push('/colaborador')
      }, 2000)
    },
    onError: (err) => {
      const error = graphError(err)
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: error,
        showConfirmButton: false,
        timer: 2000
      })
    },
  })

  const onSubmit = (data) => {
    const variables = {
      collaborator: {
        names: data.names,
        surnames: data.surnames,
        identification: data.identification
      },
      id_organization: me.id_organization,
      id_market: me.id_market,
      username: data.username,
      id_role: Number(state.role)
    }
    createCollaborator({ variables })
  }

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    })
  }

  return (
    <Container>
      <Typography variant="h1" color="secondary">Crear colaborador</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerForm>
          <WrapInput>
            <TextField
              id="names"
              name="names"
              label="Nombre"
              fullWidth
              inputRef={register}
              required
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="surnames"
              name="surnames"
              label="Apellido"
              fullWidth
              inputRef={register}
              required
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="identification"
              name="identification"
              label="Identificación"
              fullWidth
              inputRef={register}
              required
            />
          </WrapInput>
          <WrapInput>
            <TextField
              id="username"
              name="username"
              label="Nombre de usuario"
              fullWidth
              inputRef={register}
              required
            />
          </WrapInput>
          <WrapInput>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Rol</InputLabel>
              <Select
                native
                value={state.role}
                onChange={handleChange}
                required
                fullWidth
                inputProps={{
                  name: 'role',
                  id: 'role-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={1}>Administrador</option>
                <option value={2}>Vendedor</option>
              </Select>
            </FormControl>
          </WrapInput>
        </InnerForm>
        <Button type="submit" variant="contained" color="secondary">{loading ? 'Creando' : 'Crear'}</Button>
      </Form>
    </Container>
  )
}

export default CreateProviderView