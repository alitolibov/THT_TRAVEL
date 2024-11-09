<template>
    <div class="container" />
</template>

<script lang="ts" setup>
const router = useRouter();
if (!process.server) {
    localStorage.removeItem('token');
    router.push({path: '/'});
}
</script>

<style scoped>

</style>