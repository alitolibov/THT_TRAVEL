<template>
    <ckeditor
        :config="{extraPlugins: [UploaderPlugin]}"
        :editor="ClassicEditor"
        :model-value="props.modelValue"
        @update:model-value="emit('update:modelValue', $event)"
    />
</template>

<script lang="ts" setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import type { IUpload } from '~/types';

const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(['update:modelValue']);

class UploaderAdapter {
    loader: any;
    url: any;
    xhr: any;

    constructor(loader: any) {
        this.loader = loader;
        this.url = 'https://example.com/image/upload/path';
    }

    // Starts the upload process.
    async upload() {
        const file = await this.loader.file;
        const formData = new FormData();
        formData.append('image', file, file.name);

        const upload:IUpload = await $api.post('uploads', {body: formData}).json();

        return {default: upload.path};
    }

    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }
}

function UploaderPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new UploaderAdapter(loader);
    };
}
</script>

<style>
.ck-editor__editable_inline {
    min-height: 400px;
    max-height: 800px;
}

.ck-toolbar {
    @apply dark:!bg-muted-900;
}

.ck-content {
    @apply dark:!text-muted-400 dark:!bg-muted-900;
}

:root.dark {
    --ck-border-radius: 0.375rem;
    --ck-color-text: rgb(148, 163, 184);
    --ck-custom-border: rgb(51, 65, 85);
    --ck-custom-background: rgb(15, 23, 42);
    --ck-custom-foreground: hsl(255, 3%, 18%);

    --ck-color-button-on-background: var(--ck-custom-foreground);
    --ck-color-button-on-disabled-background: var(--ck-custom-foreground);

    --ck-color-base-foreground: var(--ck-custom-background);
    --ck-color-button-default-background: var(--ck-custom-background);
    --ck-color-button-default-disabled-background: var(--ck-custom-background);
    --ck-color-dropdown-panel-background: var(--ck-custom-background);
    --ck-color-input-background: var(--ck-custom-background);
    --ck-color-labeled-field-label-background: var(--ck-custom-background);
    --ck-color-list-background: var(--ck-custom-background);
    --ck-color-panel-background: var(--ck-custom-background);
    --ck-color-toolbar-background: var(--ck-custom-background);


    --ck-color-input-border: var(--ck-custom-border);
    --ck-color-panel-border: var(--ck-custom-border);
    --ck-color-toolbar-border: var(--ck-custom-border);
    --ck-color-base-border: var(--ck-custom-border);
    --ck-color-widget-blurred-border: hsl(0, 0%, 87%);
    --ck-color-widget-hover-border: hsl(43, 100%, 68%);
}

</style>
