import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Router from 'next/router'
import { Typography, Button, TextField, FormControl, InputLabel, Select } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { Container, Form, InnerForm, WrapInput, LoaderPage, ErrorPage, Loading } from '../../components'
import { COLLABORATOR_UPDATE } from '../../mutations/collaborator'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const EditarProviderView = ({ me, isLoading, isError, collaborator, id_collaborator }) => {
  if (isLoading) {
    return <LoaderPage><Loading /></LoaderPage>
  }

  if (isError) {
    return <ErrorPage>Hubo un error</ErrorPage>
  }

  const classes = useStyles()
  const { control, handleSubmit } = useForm()

  const [updateCollaborator, { loading }] = useMutation(COLLABORATOR_UPDATE, {
    onCompleted: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Se ha actualizado el colaborador! redireccionando...',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        Router.push('/colaborador')
      }, 2000)
    },
    onError: () => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Hubo un error al actualizar el colaborador!',
        showConfirmButton: false,
        timer: 2000
      })
    },
  })
  const [state, setState] = useState({
    role: `${collaborator.role.id}`,
  });

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
      id_role: Number(state.role),
      id_collaborator,
    }
    updateCollaborator({ variables })
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
      <Typography variant="h1" color="secondary">Actualizar colaborador</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InnerForm>
          <WrapInput>
            <Controller
              id="names"
              name="names"
              label="Nombre"
              fullWidth
              control={control}
              as={TextField}
              defaultValue={collaborator.names}
              required
            />
          </WrapInput>
          <WrapInput>
            <Controller
              as={TextField}
              id="surnames"
              name="surnames"
              label="Apellido"
              defaultValue={collaborator.surnames}
              control={control}
              fullWidth
              required
            />
          </WrapInput>
          <WrapInput>
            <Controller
              as={TextField}
              control={control}
              id="identification"
              defaultValue={collaborator.identification}
              name="identification"
              label="Identificación"
              fullWidth
              required
            />
          </WrapInput>
          <WrapInput>
            <Controller
              as={TextField}
              control={control}
              id="username"
              defaultValue={collaborator.user.username}
              name="username"
              label="Nombre de usuario"
              fullWidth
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
                <option value={1}>Administrador</option>
                <option value={2}>Vendedor</option>
              </Select>
            </FormControl>
          </WrapInput>
        </InnerForm>
        <Button type="submit" variant="contained" color="secondary">{loading ? 'Editando' : 'Editar'}</Button>
      </Form>
    </Container>
  )
}

export default EditarProviderView