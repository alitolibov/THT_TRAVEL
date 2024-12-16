<template>
    <div>
        <slot />
        <Toast id="GlobalToast" />
    </div>
</template>

<script lang="ts" setup>
import Toast from '~/components/common/Toast.vue';</script>
