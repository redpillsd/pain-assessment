export default function validate(values) {
    let errors = {};

    const isRequiredField = 'Este campo es requerido';
    const shouldHaveMoreThanThree = 'Este campo debe contener 3 o más caracteres';
    const shouldHaveMoreThanFive = 'Este campo debe contener 5 o más caracteres';
    const passShouldBeEqual = 'La confirmacion de password debe coincidir con el password'
    const invalidField = 'Este campo es inválido';
    
    if (!values.firstName) {
        errors.firstName = isRequiredField;
    } else if (values.firstName.length < 3) {
        errors.firstName = shouldHaveMoreThanThree;
    }

    if (!values.lastName) {
        errors.lastName = isRequiredField;
    } else if (values.lastName.length < 3) {
        errors.lastName = shouldHaveMoreThanThree;
    }

    if (!values.email) {
        errors.email = isRequiredField;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = invalidField;
    }

    if (!values.password) {
        errors.password = isRequiredField;
    } else if (values.password.length < 5) {
        errors.password = shouldHaveMoreThanFive;
    }

    if (!values.passwordConfirmation) {
        errors.passwordConfirmation = isRequiredField;
    } else if (values.passwordConfirmation.length < 5) {
        errors.passwordConfirmation = shouldHaveMoreThanFive;
    } else if (values.password !== values.passwordConfirmation) {
        errors.passwordConfirmation = passShouldBeEqual;
    }

    return errors;
  };