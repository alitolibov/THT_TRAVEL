<template>
    <div class="nui-input-wrapper nui-input-default nui-input-md nui-input-rounded">
        <label
            v-if="props.label"
            for="file"
            class="nui-input-label"
        >
            {{ props.label }}
        </label>
        <div
            class="block border border-dashed border-primary-500 bg-blue-50 dark:bg-muted-900 p-4 rounded-md text-center text-sm text-gray-500 cursor-pointer"
        >
            <div
                v-if="filesData.length && !hideImages"
                class="flex flex-wrap gap-5"
            >
                <template v-if="!excelFormat.includes(fileFormat) || !fileFormat">
                    <div
                        v-for="file in filesData"
                        class="relative p-3 border border-dashed border-primary-500 rounded-lg"
                    >
                        <img
                            :src="file.url"
                            alt="photo"
                            class="w-20 aspect-square object-contain"
                        >
                        <Icon
                            class="top-1 right-1 absolute"
                            name="ph:x"
                            size="18"
                            @click="removeFile(file.id)"
                        />
                    </div>
                </template>
                <div
                    v-else
                    class="p-3 border border-dashed border-primary-500 rounded-lg"
                >
                    <Icon
                        name="ph:file-xls"
                        size="45"
                        color="#fff"
                    />
                </div>
            </div>
            <label class="flex flex-col w-full cursor-pointer">
                <input
                    id="file"
                    :multiple="props.multiple"
                    class="hidden"
                    type="file"
                    :accept="props.accept"
                    @change="uploadFile"
                >
                <span>Перетащить или <span class="text-blue-500 underline">выбрать</span></span>
                <span v-if="description">{{ description }}</span>
            </label>
        </div>
    </div>
</template>

<script lang="ts" setup>

const emit = defineEmits(['update:modelValue', 'fileChange', 'update:files']);
const props = withDefaults(
    defineProps<{
        modelValue: number | number[],
        multiple?: boolean,
        file?: any,
        accept?: string
        label?: string,
        description?: string,
        hideImages?: boolean
    }>(),
    {
        accept: '.jpeg, .png, .webp, .gif, .svg+xml'
    }
);

const uploadsService = useService('uploads', {auth: true});
const filesData = ref<any[]>([]);
const fileFormat = ref<string>('');
const excelFormat = ref<string>('.xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
const toast = useToast('GlobalToast');

function updateValue(files: any[] | null) {
    let imgIds = null;

    if(files && files.length > 0) {
        imgIds = files.map(el => el.id);
    }

    emit('update:files', files);
    emit('update:modelValue', imgIds);
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
    fileFormat.value = target.files[0].type;
    updateValue(filesData.value);
}

async function processFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const uri = await new Promise((resolve) => {
        reader.addEventListener('load', () => resolve(reader.result), false);
    });
    return uploadsService.create({file: uri}).exec();
}

async function removeFile(id: string) {
    try {
        await uploadsService.remove(id).exec();
        filesData.value = filesData.value.filter(file => file.id != id);
        updateValue(filesData.value);
    } catch (e: any) {
        toast.show({message: e.message, timeout: 3000, type: 'error'});
    }
}

async function create() {
    if (!props.modelValue) {
        return;
    }
    const ids = Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
    filesData.value = await Promise.all(ids.map(id => uploadsService.get(id.toString()).exec()));
}

onMounted(() => create());

watch(() => props.modelValue, async () => {
    create();
});
</script>

<style scoped>

</style>
