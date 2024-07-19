<template>
  <div class="container">
    <Header />
    <router-view />
    <bottomNav />
  </div>
</template>

<script setup>
import Header from "@/components/header.vue";
import bottomNav from "@/components/bottom_nav.vue";
</script>

<style></style>
