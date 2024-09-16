<template>
    <input
        type="file"
        :multiple="props.multiple"
        @change="uploadFile"
    >
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue', 'fileChange']);
const props = defineProps<{multiple?: boolean, removeFileId?: string}>();
const filesData = ref<any[]>([]);

function updateValue(files: any[]) {
    emit('update:modelValue', files);
    emit('fileChange', files);
}

async function uploadFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) {
        return;
    }

    if (props.multiple) {
        const files = Array.from(target.files);
        const uploads = await Promise.all(files.map(processFile));
        filesData.value.push(...uploads);
    } else {
        const file = target.files[0];
        filesData.value = [await processFile(file)];
    }
}

async function processFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const uri = await new Promise((resolve) => {
        reader.addEventListener('load', () => resolve(reader.result), false);
    });
    const upload = await useService('uploads', {auth: true}).create({file: uri}).exec();
    updateValue(upload.file);
}

async function removeFile(id:string) {
    try {
        await useService('uploads', { auth: true }).remove(id).exec();
        filesData.value = filesData.value.filter(file => file.id != id);
    } catch (e) { /* empty */ }
}

watch(filesData, () => updateValue(filesData.value), {deep: true});
watch(() => props.removeFileId, (newValue:any) => removeFile(newValue));
</script>

<style scoped>

</style>
