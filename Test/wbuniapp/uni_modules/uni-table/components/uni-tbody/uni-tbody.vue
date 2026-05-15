<template>
    <!-- #ifdef H5 -->
    <tbody class="uni-tbody" :style="{'max-height':height}">
        <slot></slot>
    </tbody>
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <view class="uni-tbody" :style="{'max-height':height}">
        <slot></slot>
    </view>
    <!-- #endif -->
</template>

<script>
export default {
    name: 'uniBody',
    props: ['height'],
    options: {
        virtualHost: true
    },
    data() {
        return {

        }
    },
    created() { },
    methods: {}
}
</script>

<style>
.uni-tbody {
    display: block;
    width: 100%;
    overflow: auto;
}
</style>
