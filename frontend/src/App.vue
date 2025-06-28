<template>
  <div class="container">
    <!-- Sidebar -->
    <div class="sidebar" v-if="showSidebar">
      <SidebarComponent />
    </div>

    <!-- Main Section (Header + Content) -->
    <div class="main-content">
      <!-- Header -->
      <div class="header" v-if="showSidebar">
        <HeaderComponent />
        <!-- <div v-if="currentRoutePath() === '/gps_data'">
          test
        </div> -->
      </div>

      <!-- Content -->
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarComponent from './components/SidebarComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  components: {
    SidebarComponent,
    HeaderComponent
  },
  setup() {
    const route = useRoute();

    const showSidebar = computed(() => {
      return route.path !== '/login';
    });

    return { showSidebar };
  },
  data() {
    return {

    };
  },
  methods: {

  },
  computed: {
    // currentRoutePath() {
    //   return `${this.$route.path}`;
    // },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}

/* Layout หลัก */
.container {
  /* height: 100vh; */
  height: 100%;
}

/* Sidebar */
.sidebar {
  position: fixed;
  width: 250px;
  z-index: 99;
}

/* ส่วนขวา (Header + Content) */
.main-content {
  margin-left: 250px;
  display: flex;
  flex-direction: column;
  flex: 1;
  /* ขยายเต็มพื้นที่ที่เหลือ */
}

/* Header */
/* .header {
  height: 80px;
  background: #ddd;
  display: flex;
  align-items: center;
  padding: 0 20px;
} */

/* Content */
.content {
  margin-top: 5px;
  flex: 1;
  /* ทำให้ Content ขยายเต็มที่ */
  background: #fff;
  padding: 20px;
}
</style>