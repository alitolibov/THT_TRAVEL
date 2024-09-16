<template>
    <div class="flex">
        <div v-if="uploadedFile?.url">
            <div class="flex items-center gap-5">
                <img
                    :class="{'rounded-full': props.circle}"
                    :src="uploadedFile?.url"
                    alt="..."
                    class="w-[120px] h-[120px] object-contain"
                >
                <div>
                    <label class="block text-[#1365FF] cursor-pointer underline text-lg">
                        <FileForm
                            class="hidden"
                            @fileUpload="uploadFile"
                        />
                    </label>
                    <button
                        class="text-lg text-[#777777] cursor-pointer"
                        @click="deleteFile"
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
        <div
            v-else
            class="flex-auto"
        >
            <DragDrop
                v-model="imgIds"
                v-model:files="files"
                @fileChange="uploadFile"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import DragDrop from '~/components/common/DragDrop.vue';
import FileForm from '~/components/common/FileForm.vue';

const props = defineProps<{ modelValue?: any, circle?: boolean }>();
const emit = defineEmits(['update:modelValue', 'update:files']);

const uploadedFile = ref<any>({});
const imgIds = ref<any>();
const files = ref<any>();

function updateValue(img: any) {
    emit('update:modelValue', img);
}

watch(files, (newVal) => {
    updateValue(newVal[0]);
}, {deep: true});

watch(props.modelValue, async () => {
    await loadImage();
}, {immediate: true});

onMounted(async () => {
    await loadImage();
});

async function loadImage(){
    if (!props.modelValue) {
        return;
    }
    uploadedFile.value = props.modelValue;
    await nextTick();
}

async function deleteFile() {
    uploadedFile.value = null;
    updateValue(null);
}

function uploadFile(file: any) {
    if(!file.id) {
        updateValue(null);
        return;
    }
    else {
        updateValue(uploadedFile.value);
    }
}
</script>

<style scoped>

</style>
