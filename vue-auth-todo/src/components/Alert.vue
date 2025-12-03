<script setup>
const props = defineProps({
    title: {
        type: String,
        required: false,
    },
    text: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
        default: 'success'
    }
})
</script>

<template>
  <v-alert
    :text="props.text"
    :title="props.title"
    :type="props.type"
  ></v-alert>
</template>