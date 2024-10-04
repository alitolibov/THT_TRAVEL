<template>
    <div class="container flex items-center justify-center h-screen">
        <div class="w-72">
            <form
                class="flex flex-col gap-3"
                @submit.prevent="submit"
            >
                <BaseInput
                    v-model="loginData.email"
                    :error="errors.email"
                    name="email"
                    placeholder="Введите e-mail"
                    type="email"
                    icon="ph:at"
                />
                <BaseInput
                    v-model="loginData.password"
                    :error="errors.password"
                    name="password"
                    placeholder="Введите пароль"
                    type="password"
                    icon="ph:password"
                />
                <BaseButton
                    :loading="loginService.isPending.value"
                    :color="loginService.isError.value ? 'danger' : 'primary'"
                    class="btn-primary w-full"
                    type="submit"
                >
                    Войти
                </BaseButton>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useService } from '~/composables/useService';
import { setToken } from '~/utils/login';

useHead({
    title: 'Войти'
});

const errors = ref({email: '', password: ''});
const toast = useToast('GlobalToast');
const loginData = reactive({email: '', password: ''});
const loginService = useService('auth/sign-in', 'sign-in').create();


async function submit() {
    errors.value = {email: '', password: ''};
    if (!loginData.email) {
        errors.value.email = 'Данное поле обязательное';
        return;
    }

    if (!loginData.password) {
        errors.value.password = 'Данное поле обязательное';
        return;
    }

    if (loginData.password.length < 8) {
        errors.value.password = 'Должно быть минимум 8 символов';
        return;
    }

    try {
        const res:{access_token: string} | any = await loginService.mutateAsync(loginData);
        setToken(JSON.stringify(res?.access_token));
        navigateTo('/');
    } catch (e) {
        if(e.statusCode == 401) {
            toast.show({message: 'Неправильный email или пароль', timeout: 3000, type: 'error'});
        }
    }
}
</script>

<style scoped>
</style>
