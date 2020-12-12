import { FormGroup } from "@angular/forms";

export const confirmPassword = (form: FormGroup) => {
    const password = form?.controls?.password?.value;;
    const passwordRepeat = form?.controls?.passwordRepeat?.value;
    if (password && passwordRepeat && password !== passwordRepeat) {
        return { invalidConfirmPassword: true };
    }
    return null;
};
