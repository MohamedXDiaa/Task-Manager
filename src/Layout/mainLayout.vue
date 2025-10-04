<script setup>
    import SideBar from '../components/sideBar.vue'
</script>

<template>
    <SideBar>
        <keep-alive include="TaskList">
            <router-view />
        </keep-alive>
    </SideBar>
</template>