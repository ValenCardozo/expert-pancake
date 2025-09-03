import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Password } from "primereact/password"

const ResetPassword = () => {

    const navigate = useNavigate()

    const resetSchema = Yup.object({
        password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Campo requerido'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
            .required('Campo requerido')
    })

    const { resetPassword } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({ token: '', id: '' })

    useEffect(() => {
        const url = new URLSearchParams(window.location.search)
        setParams({ token: url.get('token') || "", id: url.get('id') || "" })
    }, [])

    const invalidLink = !params.token || !params.id

   return (
        <Card title="Restablecer contraseña">
            {invalidLink ? (
            <p>
                Enlace inválido o incompleto. Por favor, verifica el enlace enviado a tu
                correo.
            </p>
            ) : (
            <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                validationSchema={resetSchema}
                onSubmit={async (values, { resetForm }) => {
                setLoading(true);
                try {
                    const response = await resetPassword(
                    params.id,
                    params.token,
                    values.password
                    );

                    if (response) {
                    resetForm();
                    navigate("/login");
                    }
                } finally {
                    setLoading(false);
                }
                }}
            >
                {({ values, handleChange, handleBlur }) => (
                <Form>
                    <label htmlFor="password">Nueva contraseña:</label>
                    <Password
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    feedback={false}
                    placeholder="Ingrese su nueva contraseña"
                    />
                    <ErrorMessage name="password" component="div" />
                    <Button
                    type="submit"
                    icon={loading ? "pi pi-spin pi-spinner" : "pi pi-send"}
                    label={loading ? "Procesando..." : "Enviar"}
                    />
                </Form>
                )}
            </Formik>
            )}
        </Card>
        );

}
export default ResetPassword