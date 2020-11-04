import { FormGroup } from "@angular/forms";

export const confirmPassword = (form: FormGroup) => {
    const password = form.get('password');
    const passwordRepeat = form.get('passwordRepeat');
    /* debugger */
    if (password && passwordRepeat && password.value !== passwordRepeat.value) {
        return { invalidConfirmPassword: true };
    }
    return null;
};
